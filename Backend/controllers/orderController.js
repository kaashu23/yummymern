const Order = require('../models/Order');
const generateEmailTemplate = require('../utils/emailTemplate');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const { customerInfo, orderType, items, subtotal, tax, totalAmount, deliveryAddress, stripePaymentIntentId } = req.body;

    const path = require('path');
    const generateOrderPDF = require('../utils/pdfGenerator');
    const sendEmail = require('../utils/sendEmail');
    
    const order = await Order.create({
      clerkUserId: req.user.clerkId, // From Clerk middleware
      customerInfo,
      orderType,
      items,
      subtotal,
      tax,
      totalAmount,
      deliveryAddress,
      stripePaymentIntentId,
      status: 'pending'
    });

    // Generate and Email PDF asynchronously
    if (customerInfo && customerInfo.email) {
      const filePath = path.join(__dirname, '..', 'temp', `Receipt-${order._id}.pdf`);
      // Ensure temp dir exists
      const fs = require('fs');
      if (!fs.existsSync(path.join(__dirname, '..', 'temp'))) {
        fs.mkdirSync(path.join(__dirname, '..', 'temp'));
      }
      
      generateOrderPDF(order, filePath)
        .then(() => {
          const htmlContent = generateEmailTemplate(
            'Thank you for your order!',
            `
              <p>Hi ${customerInfo.name || 'Guest'},</p>
              <p>We have successfully received your order and are currently preparing it with the utmost care.</p>
              <p>Your complete order receipt is attached to this email as a PDF document for your reference.</p>
            `
          );

          return sendEmail({
            email: customerInfo.email,
            subject: 'Yummy - Your Order Receipt',
            message: htmlContent,
            attachments: [{ filename: `Receipt-${order._id}.pdf`, path: filePath }]
          });
        })
        .then(() => {
          // Cleanup
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        })
        .catch(err => console.error("PDF/Email Error:", err));
    }

    // Emit real-time socket event to admins
    const io = req.app.get('io');
    if (io) {
      io.to('admin_room').emit('new_order', order);
    }

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ clerkUserId: req.user.clerkId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updateData = { status };
    if (status === 'delivered') {
      updateData.completedAt = new Date();
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel order (User)
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, clerkUserId: req.user.clerkId });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    if (order.status !== 'pending' && order.status !== 'Preparing') {
      return res.status(400).json({ success: false, message: 'Cannot cancel order at this stage' });
    }
    
    order.status = 'cancelled';
    await order.save();

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};
