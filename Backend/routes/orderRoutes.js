const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');
const { clerkMiddleware } = require('../middleware/clerkMiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware');

// All order routes require authentication
router.use(clerkMiddleware);

router.route('/')
  .post(createOrder)
  .get(adminMiddleware, getOrders); // Only admins can get all orders

router.route('/myorders')
  .get(getMyOrders);

router.route('/:id/status')
  .put(adminMiddleware, updateOrderStatus); // Only admins can update status

router.route('/:id/cancel')
  .put(cancelOrder); // User can cancel own order

module.exports = router;
