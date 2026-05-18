const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mockDb = require('../mockDb');
const mongoose = require('mongoose');

// POST /api/signup
router.post('/signup', async (req, res) => {
  const { username, password, phone, dob } = req.body;

  if (!username || !password || !phone || !dob) {
    return res.status(400).json({ success: false, message: 'All fields are required!' });
  }

  // Check if MongoDB is connected
  const isMongoConnected = mongoose.connection.readyState === 1;

  if (isMongoConnected) {
    try {
      const existingUser = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
      if (existingUser) {
        return res.status(200).json({ exists: true, success: false, message: 'Username is already taken!' });
      }

      const newUser = new User({ username, password, phone, dob });
      await newUser.save();

      console.log(`[DB SUCCESS] User registered in MongoDB: ${username}`);
      return res.status(201).json({ exists: false, success: true, message: 'User registered in MongoDB!' });
    } catch (err) {
      console.error('[DB ERROR] Failed to save in MongoDB, falling back to Mock DB:', err);
      // Fallback below
    }
  }

  // Fallback to Mock DB
  console.log('[MOCK DB] Processing registration in memory...');
  const existingMockUser = mockDb.findUser(username);
  if (existingMockUser) {
    return res.status(200).json({ exists: true, success: false, message: 'Username is already taken (Mock DB)!' });
  }

  mockDb.addUser({ username, password, phone, dob });
  console.log(`[MOCK SUCCESS] User registered in memory: ${username}`);
  return res.status(201).json({ exists: false, success: true, message: 'User registered in Mock DB!' });
});

module.exports = router;
