const express = require('express');
const { clerkWebhookSync } = require('../controllers/authController');

const router = express.Router();

// Webhook needs raw body for Svix verification
router.post('/webhook', express.raw({ type: 'application/json' }), clerkWebhookSync);

module.exports = router;
