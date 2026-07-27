const ContactMessage = require('../models/ContactMessage');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    const contactMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message
    });

    // Send email to admin
    const emailMessage = `
      <h1>New Contact Message</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    await sendEmail({
      email: process.env.EMAIL_USER, // Admin email
      subject: `New Contact Request: ${subject}`,
      message: emailMessage
    });

    res.status(201).json({ success: true, message: 'Message sent successfully', contactMessage });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages
// @route   GET /api/contact
// @access  Private/Admin
const getMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort('-createdAt');
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// @desc    Mark message as read
// @route   PUT /api/contact/:id/read
// @access  Private/Admin
const markMessageAsRead = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    message.isRead = true;
    await message.save();

    res.json(message);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMessage,
  getMessages,
  markMessageAsRead
};
