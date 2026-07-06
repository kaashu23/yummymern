const { requireAuth } = require('@clerk/express');
const User = require('../models/User');

const adminMiddleware = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth.userId;
      if (!clerkId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await User.findOne({ clerkId });
      
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden - Admin access required' });
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }
];

module.exports = { adminMiddleware };
