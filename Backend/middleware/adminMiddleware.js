const User = require('../models/User');
const { clerkMiddleware } = require('./clerkMiddleware');

const roleMiddleware = (allowedRoles) => [
  clerkMiddleware,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized - User not attached' });
      }

      if (!allowedRoles.includes(req.user.role) && req.user.role !== 'super_admin' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden - Insufficient privileges' });
      }

      next();
    } catch (error) {
      next(error);
    }
  }
];

const adminMiddleware = roleMiddleware(['admin', 'super_admin']);

module.exports = { adminMiddleware, roleMiddleware };
