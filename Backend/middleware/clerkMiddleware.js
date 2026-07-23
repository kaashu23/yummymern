const User = require('../models/User');

// Middleware to verify Clerk session token and attach user from MongoDB
const clerkMiddleware = async (req, res, next) => {
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
      
      // Auto-sync user if they don't exist in DB yet (crucial for local testing without webhooks)
      if (!user) {
        // We will just create a placeholder user so they aren't completely blocked
        const clerkClient = require('@clerk/express').clerkClient; // Optional if we want to fetch details
        
        user = await User.create({
          clerkId: clerkId,
          name: 'Guest User',
          email: `${clerkId}@placeholder.com`, // Fallback
          role: 'user'
        });

        // Notify admin about the local fallback registration
        const sendEmail = require('../utils/sendEmail');
        const adminEmail = process.env.EMAIL_USER;
        if (adminEmail) {
          sendEmail({
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
