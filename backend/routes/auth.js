const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');



const router = express.Router();
const { ACCOUNT_SID, AUTH_TOKEN, SERVICE_SID } = process.env

const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN, {
    lazyLoading: true
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

                return res.status(200).send('Verification code sent Successfully');
            }
        } else {
            user = new User({ phone, email, name, password: hashedPassword, isVerified: false });
            await user.save();

            await client.verify.v2.services(SERVICE_SID)
                .verifications
                .create({ to: phone, channel: 'sms' });

            const responseObject = {
                name: user.name,
                msg: 'Verification code sent Successfully'
            };

            return res.status(200).send(responseObject);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
});

router.post('/verify', async (req, res) => {
    const { phone, code } = req.body;
    try {
        const verificationCheck = await client.verify.v2.services(SERVICE_SID)
            .verificationChecks
            .create({ to: phone, code });

        if (verificationCheck.status === 'approved') {
            // const user = await User.findOne({ phone });
            const user = await User.findOneAndUpdate({ phone }, { isVerified: true });
            const jwtToken = jwt.sign({ phone: user.phone }, process.env.JWT_SECRET);
            const responseObject = {
                name: user.name,
                token: jwtToken
            };
            res.status(200).json({ responseObject });
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
    if (!phone || !password) {
        return res.status(401).send('Input cannot be empty');
    }
    try {
        const user = await User.findOne({ phone });
        if (!user || !user.isVerified) {
            return res.status(401).send('User not found');
        }
        if (user && await bcrypt.compare(password, user.password)) {
            await client.verify.v2.services(SERVICE_SID)
                .verifications
                .create({ to: phone, channel: 'sms' });

            const responseObject = {
                name: user.name,
                msg: 'Verification code sent Successfully'
            };

            return res.status(200).send(responseObject);
        } else {
            res.status(401).send('Incorrect Password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
});

module.exports = router;
