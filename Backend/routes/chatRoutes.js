const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// In production, this should be set in .env
// We provide a fallback just to prevent crashing, but it will error without a valid key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    // Use the latest flash model
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const systemPrompt = `You are a helpful, polite, and elegant AI assistant for a Michelin-star Indian fine dining restaurant called 'Yummy'.
    You can answer questions about the menu, opening hours (Mon-Sun: 12PM - 11PM), and ambiance.
    If the user asks to book a table, tell them they can click the "Book a Table" button on the website, or you can guide them.
    Keep your answers concise, luxurious, and well-formatted. Do not hallucinate menu items not typical of premium Indian cuisine.`;

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
    res.status(500).json({ error: 'Failed to process chat. Please ensure GEMINI_API_KEY is set in your .env file.' });
  }
});

module.exports = router;
