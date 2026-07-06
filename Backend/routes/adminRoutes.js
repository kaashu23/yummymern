const express = require('express');
const { requireAuth } = require('@clerk/express');
const User = require('../models/User');

const router = express.Router();

router.get('/check', requireAuth(), async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    if (!clerkId) return res.status(401).json({ isAdmin: false });

    let user = await User.findOne({ clerkId });
    
    // Auto-promote for testing if they hit this endpoint
    if (user && user.role !== 'admin') {
      user.role = 'admin';
      await user.save();
    } else if (!user) {
      user = await User.create({ clerkId, role: 'admin' });
    }

    res.status(200).json({ isAdmin: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ isAdmin: false });
  }
});

module.exports = router;

