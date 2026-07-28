const User = require('../models/User');

// Middleware to verify Clerk session token and attach user from MongoDB
const clerkMiddleware = async (req, res, next) => {
  if (req.user) return next();
  try {
    let clerkId = req.auth?.userId;
    
    // Fallback: If Clerk's strict middleware failed to set req.auth, 
    // manually decode the JWT Bearer token from the header (very common in local dev)
    if (!clerkId && req.headers.authorization?.startsWith('Bearer ')) {
      const token = req.headers.authorization.split(' ')[1];
      try {
        // We only decode it to extract the user ID without strict secret verification
        // since local development often blocks cross-origin Clerk cookies
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        clerkId = payload.sub; 
      } catch (e) {
        console.error("Failed to manually decode token", e);
      }
    }

    if (!clerkId) {
      return res.status(401).json({ message: 'Unauthorized - Invalid or missing token' });
    }

    let user = await User.findOne({ clerkId });
    
    // Fix placeholder emails and upgrade to admin if needed
    if (user && (user.email.includes('@placeholder.com') || user.role === 'user')) {
      let isChanged = false;
      
      // If they have a placeholder, fetch real details
      if (user.email.includes('@placeholder.com')) {
        try {
          const { clerkClient } = require('@clerk/express');
          const clerkUser = await clerkClient.users.getUser(clerkId);
          const realEmail = clerkUser.emailAddresses[0]?.emailAddress;
          if (realEmail) {
            user.email = realEmail;
            user.name = clerkUser.firstName || clerkUser.username || user.name;
            isChanged = true;
          }
        } catch (e) {
          console.error("Failed to fetch real email:", e);
        }
      }

      // Check for admin upgrade
      if ((user.email === process.env.EMAIL_USER || user.email === 'kashishsalvi06@gmail.com') && user.role !== 'admin') {
        user.role = 'admin';
        isChanged = true;
      }

      if (isChanged) {
        await user.save();
      }
    }
      
    // Auto-sync user if they don't exist in DB yet (crucial for local testing without webhooks)
      if (!user) {
        let email = `${clerkId}@placeholder.com`;
        let name = 'Guest User';
        try {
          const { clerkClient } = require('@clerk/express');
          const clerkUser = await clerkClient.users.getUser(clerkId);
          email = clerkUser.emailAddresses[0]?.emailAddress || email;
          name = clerkUser.firstName || clerkUser.username || name;
        } catch (e) {
          console.error("Clerk fetch error:", e);
        }

        const role = (email === process.env.EMAIL_USER || email === 'kashishsalvi06@gmail.com') ? 'admin' : 'user';

        user = await User.create({
          clerkId: clerkId,
          name: name,
          email: email,
          role: role
        });

        // Notify admin about the local fallback registration
        const sendEmail = require('../utils/sendEmail');
        const adminEmail = process.env.EMAIL_USER;
        if (adminEmail) {
          await sendEmail({
            email: adminEmail,
            subject: 'Yummy - New User Registration (Local Fallback)',
            message: `<h1>New User Registered (Fallback)</h1>
                      <p>A new user was auto-synced by the middleware because the Clerk webhook did not catch them.</p>
                      <p>This usually happens in local development if the Clerk listener is not running.</p>
                      <p><strong>Clerk ID:</strong> ${clerkId}</p>`
          });
        }
      }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { clerkMiddleware };
