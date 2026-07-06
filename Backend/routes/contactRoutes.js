const express = require('express');
const {
  createMessage,
  getMessages,
  markMessageAsRead
} = require('../controllers/contactController');
const { adminMiddleware } = require('../middleware/adminMiddleware');

const router = express.Router();

router.route('/')
  .post(createMessage)
  .get(adminMiddleware, getMessages);

router.route('/:id/read')
  .put(adminMiddleware, markMessageAsRead);

module.exports = router;
