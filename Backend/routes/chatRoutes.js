const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const MenuItem = require('../models/MenuItem');
const Reservation = require('../models/Reservation');
const Order = require('../models/Order');
const User = require('../models/User');

// In production, this should be set in .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    // Try to decode clerkId if Authorization header exists
    let userContext = "User is not logged in.";
    if (req.headers.authorization?.startsWith('Bearer ')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const clerkId = payload.sub;
        
        const user = await User.findOne({ clerkId });
        if (user) {
          const reservations = await Reservation.find({ user: user._id }).sort({ date: -1, timeSlot: -1 });
          const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 });
          
          userContext = `User is logged in. Name: ${user.name}.
Reservations: ${reservations.length > 0 ? JSON.stringify(reservations.map(r => ({ date: r.date, time: r.timeSlot, guests: r.partySize, status: r.status }))) : "No reservations found."}
Orders: ${orders.length > 0 ? JSON.stringify(orders.map(o => ({ total: o.totalAmount, status: o.status, date: o.createdAt }))) : "No orders found."}`;
        }
      } catch (e) {
        console.error("Token decode error in chat", e);
      }
    }

    // Fetch Menu
    const menuItems = await MenuItem.find({}).populate('category', 'name').limit(30);
    const menuContext = menuItems.length > 0 ? menuItems.map(m => `${m.name} ($${m.price}) - ${m.description || ''}`).join('\n') : "Menu is currently unavailable.";

    // Use the latest flash model
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const systemPrompt = `You are a helpful, polite, and elegant AI assistant for a Michelin-star Indian fine dining restaurant called 'Yummy'.
    You can answer questions about the menu, opening hours (Mon-Sun: 12PM - 11PM), and ambiance.
    If the user asks to book a new table, tell them they can click the "Book a Table" button on the website.
    If they ask about their reservations or bookings, look at the User Context below and tell them their upcoming reservations.
    If they ask about their orders, look at the User Context below and tell them their orders.
    If they ask about the menu, look at the Menu Context below and tell them the items and prices.
    Keep your answers concise, luxurious, and well-formatted. Do not hallucinate menu items not in the Menu Context.

    --- Menu Context ---
    ${menuContext}

    --- User Context ---
    ${userContext}`;

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + '\n\nUser: ' + message }] }
      ]
    });

    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to process chat.' });
  }
});

module.exports = router;
