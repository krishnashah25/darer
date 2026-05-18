const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mockDb = require('../mockDb');
const mongoose = require('mongoose');

// POST /api/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required!' });
  }

  // Check if MongoDB is connected
  const isMongoConnected = mongoose.connection.readyState === 1;

  if (isMongoConnected) {
    try {
      const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
      if (user) {
        if (user.password === password) {
          console.log(`[DB SUCCESS] Login successful in MongoDB: ${username}`);
          return res.status(200).json({
            success: true,
            user: { username: user.username, phone: user.phone, dob: user.dob }
          });
        }
      }
      return res.status(200).json({ success: false, message: 'Invalid username or password!' });
    } catch (err) {
      console.error('[DB ERROR] Failed to query MongoDB, falling back to Mock DB:', err);
      // Fallback below
    }
  }

  // Fallback to Mock DB
  console.log('[MOCK DB] Processing login in memory...');
  const user = mockDb.findUser(username);
  if (user && user.password === password) {
    console.log(`[MOCK SUCCESS] Login successful in memory: ${username}`);
    return res.status(200).json({
      success: true,
      user: { username: user.username, phone: user.phone, dob: user.dob }
    });
  }

  console.log(`[MOCK FAILURE] Invalid login attempt for: ${username}`);
  return res.status(200).json({ success: false, message: 'Invalid username or password (Mock DB)!' });
});

module.exports = router;
