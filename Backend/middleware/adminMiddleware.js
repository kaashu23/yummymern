const { requireAuth, clerkClient } = require('@clerk/express');
const User = require('../models/User');

const adminMiddleware = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth.userId;
      if (!clerkId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      let user = await User.findOne({ clerkId });

      if (!user) {
        try {
          const clerkUser = await clerkClient.users.getUser(clerkId);
          const email = clerkUser.emailAddresses[0]?.emailAddress;
          const name = clerkUser.firstName || clerkUser.username || '';
          const role = email === process.env.EMAIL_USER ? 'admin' : 'user';

          user = await User.create({ clerkId, email, name, role });
        } catch (clerkErr) {
          console.error("Clerk fetch error:", clerkErr);
        }
      }

      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden - Admin access required Ghari Jaa !' });
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }
];

module.exports = { adminMiddleware };


module.exports = { adminMiddleware };
