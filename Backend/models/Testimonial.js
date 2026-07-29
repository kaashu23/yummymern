const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  guestName: {
    type: String,
    required: true
  },
  photo: {
    type: String // ImageKit URL, optional
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  quote: {
    type: String,
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
