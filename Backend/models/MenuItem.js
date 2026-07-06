const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isVeg: {
    type: Boolean,
    default: false
  },
  isChefSpecial: {
    type: Boolean,
    default: false
  },
  images: [{
    type: String // ImageKit URLs
  }],
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  averageRating: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Add MongoDB text index on name + description for menu search
menuItemSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('MenuItem', menuItemSchema);
