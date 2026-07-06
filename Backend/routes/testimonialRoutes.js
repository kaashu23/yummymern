const express = require('express');
const multer = require('multer');
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/testimonialController');
const { adminMiddleware } = require('../middleware/adminMiddleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
  .get(getTestimonials)
  .post(adminMiddleware, upload.single('photo'), createTestimonial);

router.route('/:id')
  .put(adminMiddleware, upload.single('photo'), updateTestimonial)
  .delete(adminMiddleware, deleteTestimonial);

module.exports = router;
