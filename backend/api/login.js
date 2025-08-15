const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username and password
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        res.json({ success: true, message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;