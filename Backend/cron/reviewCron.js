const mongoose = require('mongoose');
const Order = require('../models/Order');
const Reservation = require('../models/Reservation');
const Setting = require('../models/Setting');
const sendEmail = require('../utils/sendEmail');
const generateEmailTemplate = require('../utils/emailTemplate');

const sendReviewEmails = async () => {
  try {
    // Get delay setting in minutes, default 120 (2 hours)
    let delaySetting = await Setting.findOne({ key: 'REVIEW_EMAIL_DELAY_MINUTES' });
    const delayMinutes = delaySetting ? parseInt(delaySetting.value) : 120;
    
    const cutoffTime = new Date(Date.now() - delayMinutes * 60 * 1000);

    // 1. Process Orders
    const orders = await Order.find({
      status: 'delivered',
      reviewEmailSent: false,
      completedAt: { $lte: cutoffTime }
    });

    for (const order of orders) {
      const email = order.customerInfo?.email;
      if (email) {
        const clientUrl = process.env.CLIENT_URL || 'http://127.0.0.1:5173';
        const htmlContent = generateEmailTemplate(
          'We hope you enjoyed your order!',
          `
            <p>Hi ${order.customerInfo.name || 'Guest'},</p>
            <p>Thank you for ordering from Yummy. We strive to provide the best culinary experience and would love to hear your thoughts.</p>
            <p>Your feedback helps us continuously improve and craft better experiences for our guests.</p>
          `,
          { text: 'Leave a Review', url: `${clientUrl}/leave-review` }
        );

        await sendEmail({
          email,
          subject: 'How was your meal from Yummy?',
          message: htmlContent
        });
      }
      order.reviewEmailSent = true;
      await order.save();
    }

    // 2. Process Reservations
    const reservations = await Reservation.find({
      status: 'Completed',
      reviewEmailSent: false,
      completedAt: { $lte: cutoffTime }
    }).populate('user', 'email name');

    for (const res of reservations) {
      const email = res.guestEmail || res.user?.email;
      if (email) {
        const clientUrl = process.env.CLIENT_URL || 'http://127.0.0.1:5173';
        const htmlContent = generateEmailTemplate(
          'How was your visit?',
          `
            <p>Hi ${res.guestName || res.user?.name || 'Guest'},</p>
            <p>Thank you for dining with us at Yummy on <strong>${new Date(res.date).toLocaleDateString()}</strong>. We hope you enjoyed your experience.</p>
            <p>We would love to hear your thoughts on our ambiance and culinary offerings.</p>
          `,
          { text: 'Leave a Review', url: `${clientUrl}/leave-review` }
        );

        await sendEmail({
          email,
          subject: 'How was your visit to Yummy?',
          message: htmlContent
        });
      }
      res.reviewEmailSent = true;
      await res.save();
    }
  } catch (error) {
    console.error('Error in review cron job:', error);
  }
};

const initCron = () => {
  // Run every minute
  setInterval(sendReviewEmails, 60 * 1000);
  console.log('Automated review collection background job initialized.');
};

module.exports = initCron;
