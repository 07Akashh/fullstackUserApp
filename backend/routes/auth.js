const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');



const router = express.Router();
const {ACCOUNT_SID,AUTH_TOKEN,SERVICE_SID} =process.env

const client = require('twilio')(ACCOUNT_SID,AUTH_TOKEN,{
    lazyLoading:true
})


router.post('/register', async (req, res) => {
    const { phone, email, name, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        let user = await User.findOne({ phone });
        
        if (user) {
            if (user.isVerified) {
                return res.status(400).send('User already exists and is verified');
            } else {
                user.email = email;
                user.name = name;
                user.password = hashedPassword;
                user.isVerified = false;
                await user.save();

                await client.verify.v2.services(SERVICE_SID)
                    .verifications
                    .create({ to: phone, channel: 'sms' });

                return res.status(200).send('Verification code sent and user information updated');
            }
        } else {
            user = new User({ phone, email, name, password: hashedPassword, isVerified: false });
            await user.save();

            await client.verify.v2.services(SERVICE_SID)
                .verifications
                .create({ to: phone, channel: 'sms' });

            return res.status(200).send('Verification code sent and new user created');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

router.post('/verify', async (req, res) => {
    const { phone, code } = req.body;
    try {
        const verificationCheck = await client.verify.v2.services(SERVICE_SID)
            .verificationChecks
            .create({ to: phone, code });

        if (verificationCheck.status === 'approved') {
            const user = await User.findOneAndUpdate({ phone }, { isVerified: true });
            const token = jwt.sign({ phone: user.phone }, process.env.JWT_SECRET);
            res.status(200).json({ token });
        } else {
            res.status(400).send('Invalid verification code');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error verifying user');
    }
});


router.post('/login', async (req, res) => {
    const { phone, password } = req.body;
    try {
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(401).send('User is not registered');
        }
        if (!user.isVerified) {
            return res.status(401).send('User is not verified');
        }
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ phone: user.phone }, process.env.JWT_SECRET);
            res.json({ token });
        } else {
            res.status(401).send('Invalid Credentials');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
});

module.exports = router;
