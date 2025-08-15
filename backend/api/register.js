const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/signup
router.post('/signup', async (req, res) => {
    const { username, password, phone, dob } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({ exists: true });
        }

        // Create new user
        const newUser = new User({ username, password, phone, dob });
        await newUser.save();

        res.json({ exists: false });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;