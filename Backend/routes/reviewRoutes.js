const express = require('express');
const router = express.Router();
const { getReviews, createReview, deleteReview } = require('../controllers/reviewController');
const { clerkMiddleware } = require('../middleware/clerkMiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware');

router.route('/')
  .get(getReviews)
  .post(clerkMiddleware, createReview);

router.route('/:id')
  .delete(adminMiddleware, deleteReview);

module.exports = router;
