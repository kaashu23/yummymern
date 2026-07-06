const express = require('express');
const {
  getAvailability,
  createReservation,
  getMyReservations,
  getReservations,
  updateReservationStatus,
  deleteReservation
} = require('../controllers/reservationController');
const { clerkMiddleware } = require('../middleware/clerkMiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/availability', getAvailability);

// Protected routes (User)
router.use(clerkMiddleware);
router.post('/', createReservation);
router.get('/my', getMyReservations);
router.delete('/:id', deleteReservation);

// Protected routes (Admin)
router.use(adminMiddleware);
router.get('/', getReservations);
router.put('/:id/status', updateReservationStatus);

module.exports = router;
