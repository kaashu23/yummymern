const express = require('express');
const multer = require('multer');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');
const { adminMiddleware } = require('../middleware/adminMiddleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
  .get(getEvents)
  .post(adminMiddleware, upload.single('image'), createEvent);

router.route('/:id')
  .put(adminMiddleware, upload.single('image'), updateEvent)
  .delete(adminMiddleware, deleteEvent);

module.exports = router;
