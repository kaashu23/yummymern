const Reservation = require('../models/Reservation');
const Table = require('../models/Table');
const sendEmail = require('../utils/sendEmail');

// Helper function to check availability
const checkAvailability = async (date, timeSlot, partySize) => {
  // Parse date to start and end of day to query exact day
  const targetDate = new Date(date);
  targetDate.setUTCHours(0, 0, 0, 0);
  const nextDate = new Date(targetDate);
  nextDate.setDate(nextDate.getDate() + 1);

  // Find all active tables with enough capacity
  const tables = await Table.find({ isActive: true, capacity: { $gte: partySize } });

  if (tables.length === 0) return []; // No tables large enough

  // Find existing reservations for the requested date and time slot
  // Status shouldn't be Cancelled or Completed if they overlap
  const existingReservations = await Reservation.find({
    date: { $gte: targetDate, $lt: nextDate },
    timeSlot: timeSlot,
    status: { $in: ['Pending', 'Confirmed', 'Seated'] }
  });

  const bookedTableIds = existingReservations.map(res => res.table.toString());

  // Filter out booked tables
  const availableTables = tables.filter(t => !bookedTableIds.includes(t._id.toString()));

  return availableTables;
};

// @desc    Check available tables
// @route   GET /api/reservations/availability
// @access  Public
const getAvailability = async (req, res, next) => {
  try {
    const { date, timeSlot, partySize } = req.query;

    if (!date || !timeSlot || !partySize) {
      return res.status(400).json({ message: 'Please provide date, timeSlot, and partySize' });
    }

    const availableTables = await checkAvailability(date, timeSlot, Number(partySize));

    res.json({ available: availableTables.length > 0, tables: availableTables });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a reservation
// @route   POST /api/reservations
// @access  Private
const createReservation = async (req, res, next) => {
  try {
    const { date, timeSlot, partySize, guestName, guestPhone, specialRequest, tableId } = req.body;

    const targetDate = new Date(date);
    targetDate.setUTCHours(0, 0, 0, 0);

    // Validate availability again to prevent double booking
    const availableTables = await checkAvailability(date, timeSlot, Number(partySize));

    let tableToBook = null;
    if (tableId) {
      tableToBook = availableTables.find(t => t._id.toString() === tableId);
    } else {
      tableToBook = availableTables[0]; // Auto-assign the first available
    }

    if (!tableToBook) {
      return res.status(400).json({ message: 'Selected table/time is no longer available.' });
    }

    const reservation = await Reservation.create({
      user: req.user._id,
      table: tableToBook._id,
      guestName: guestName || req.user.name,
      guestPhone,
      date: targetDate,
      timeSlot,
      partySize,
      specialRequest
    });

    // Send confirmation email asynchronously
    const emailMessage = `
      <h1>Reservation Pending</h1>
      <p>Dear ${reservation.guestName},</p>
      <p>Your reservation request for <strong>${targetDate.toDateString()}</strong> at <strong>${timeSlot}</strong> for <strong>${partySize} people</strong> has been received and is currently Pending.</p>
      <p>We will send another email once it is Confirmed.</p>
    `;
    sendEmail({
      email: req.user.email,
      subject: 'Yummy - Reservation Request Received',
      message: emailMessage
    });

    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user's reservations
// @route   GET /api/reservations/my
// @access  Private
const getMyReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id })
      .populate('table', 'tableNumber location')
      .sort('-createdAt');
    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private/Admin
const getReservations = async (req, res, next) => {
  try {
    const { date, status } = req.query;
    let query = {};

    if (date) {
      const targetDate = new Date(date);
      targetDate.setUTCHours(0, 0, 0, 0);
      const nextDate = new Date(targetDate);
      nextDate.setDate(nextDate.getDate() + 1);
      query.date = { $gte: targetDate, $lt: nextDate };
    }

    if (status) {
      query.status = status;
    }

    const reservations = await Reservation.find(query)
      .populate('table', 'tableNumber location')
      .populate('user', 'name email')
      .sort('date timeSlot');
    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

// @desc    Update reservation status
// @route   PUT /api/reservations/:id/status
// @access  Private/Admin
const updateReservationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const reservation = await Reservation.findById(req.params.id).populate('user', 'email name');
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    reservation.status = status;
    await reservation.save();

    // Send email on status change
    if (['Confirmed', 'Cancelled'].includes(status) && reservation.user) {
      const emailMessage = `
        <h1>Reservation ${status}</h1>
        <p>Dear ${reservation.guestName || reservation.user.name},</p>
        <p>Your reservation for <strong>${new Date(reservation.date).toDateString()}</strong> at <strong>${reservation.timeSlot}</strong> has been <strong>${status}</strong>.</p>
      `;
      sendEmail({
        email: reservation.user.email,
        subject: `Yummy - Reservation \${status}`,
        message: emailMessage
      });
    }

    res.json(reservation);
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel/Delete reservation
// @route   DELETE /api/reservations/:id
// @access  Private (Admin or User's own)
const deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Check if it's the user's own reservation or if user is admin
    if (reservation.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this reservation' });
    }

    // We can either delete it or mark it as cancelled
    // Project plan says "DELETE /api/reservations/:id -> Cancel reservation (user or admin)"
    reservation.status = 'Cancelled';
    await reservation.save();

    res.json({ message: 'Reservation cancelled', reservation });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAvailability,
  createReservation,
  getMyReservations,
  getReservations,
  updateReservationStatus,
  deleteReservation
};
