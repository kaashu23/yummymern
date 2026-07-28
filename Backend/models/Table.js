const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    enum: ['Indoor', 'Outdoor', 'Rooftop', 'Bar', 'Patio']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Table', tableSchema);
