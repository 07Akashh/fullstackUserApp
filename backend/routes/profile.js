const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/profile', verifyToken, async (req, res) => {
    const { profile } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate(
            { phone: req.user.phone },
            { profile },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.json({ message: 'Profile updated successfully', profile: updatedUser.profile });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ phone: req.user.phone }).select('-password');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.put('/updatePassword', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ phone: req.user.phone });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const isValidPassword = await bcrypt.compare(req.body.currentPassword, user.password);
        
        if (!isValidPassword) {
            return res.status(401).send('Invalid current password');
        }
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        
        user.password = hashedPassword;
        await user.save();
        res.status(200).send('Password updated successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
});


module.exports = router;
