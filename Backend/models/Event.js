const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String // ImageKit URL
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String
  },
  seatsAvailable: {
    type: Number
  },
  price: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
