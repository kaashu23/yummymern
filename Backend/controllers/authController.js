const { Webhook } = require('svix');
const User = require('../models/User');

const clerkWebhookSync = async (req, res) => {
  try {
    const payloadString = req.body.toString();
    const svixHeaders = req.headers;

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(payloadString, svixHeaders);

    const { id, ...attributes } = evt.data;
    const eventType = evt.type;

    if (eventType === 'user.created' || eventType === 'user.updated') {
      const email = attributes.email_addresses && attributes.email_addresses.length > 0 ? attributes.email_addresses[0].email_address : '';
      const name = attributes.first_name || attributes.username || '';
      
      const role = email === process.env.EMAIL_USER ? 'admin' : 'user';

      await User.findOneAndUpdate(
        { clerkId: id },
        { 
          clerkId: id,
          email: email,
          name: name,
          role: role
        },
        { upsert: true, new: true }
      );

      // Notify admin on new user registration
      if (eventType === 'user.created') {
        const sendEmail = require('../utils/sendEmail');
        const adminEmail = process.env.EMAIL_USER;
        if (adminEmail) {
          await sendEmail({
            email: adminEmail,
            subject: 'Yummy - New User Registration',
            message: `<h1>New User Registered</h1>
                      <p>A new user has just registered on Yummy.</p>
                      <p><strong>Name:</strong> ${name}</p>
                      <p><strong>Email:</strong> ${email}</p>`
          });
        }
      }

      return res.status(200).json({ success: true, message: 'User synced successfully' });
    }

    if (eventType === 'user.deleted') {
      await User.findOneAndDelete({ clerkId: id });
      return res.status(200).json({ success: true, message: 'User deleted successfully' });
    }

    return res.status(200).json({ success: true, message: 'Event ignored' });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  clerkWebhookSync
};
