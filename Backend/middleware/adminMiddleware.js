const { requireAuth, clerkClient } = require('@clerk/express');
const User = require('../models/User');

const roleMiddleware = (allowedRoles) => [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth.userId;
      if (!clerkId) return res.status(401).json({ message: 'Unauthorized' });

      let user = await User.findOne({ clerkId });
      if (!user) {
        try {
          const clerkUser = await clerkClient.users.getUser(clerkId);
          const email = clerkUser.emailAddresses[0]?.emailAddress;
          const name = clerkUser.firstName || clerkUser.username || '';
          const role = email === process.env.EMAIL_USER ? 'admin' : 'user';
          user = await User.create({ clerkId, email, name, role });
        } catch (err) {
          console.error("Clerk fetch error:", err);
        }
      }

      if (!user || !allowedRoles.includes(user.role) && user.role !== 'super_admin' && user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden - Insufficient privileges' });
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }
];

const adminMiddleware = roleMiddleware(['admin', 'super_admin']);

module.exports = { adminMiddleware, roleMiddleware };
