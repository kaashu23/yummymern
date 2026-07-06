const { requireAuth } = require('@clerk/express');
const User = require('../models/User');

// Middleware to verify Clerk session token and attach user from MongoDB
const clerkMiddleware = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth.userId;
      if (!clerkId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      let user = await User.findOne({ clerkId });
      
      // If user not found (e.g., webhook delayed), we could create a basic one or return 401
      // For now, let's just proceed if they have a valid clerk session, but attach null user
      // if not in DB yet. Or return 401 if strict.
      if (!user) {
        return res.status(401).json({ message: 'User not synced to DB yet' });
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }
];

module.exports = { clerkMiddleware };
