const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table'
  },
  guestName: {
    type: String
  },
  guestEmail: {
    type: String
  },
  guestPhone: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String, // e.g. "7:00 PM - 9:00 PM"
    required: true
  },
  partySize: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Seated', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  specialRequest: {
    type: String
  },
  reviewEmailSent: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
