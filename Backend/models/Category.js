const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  image: {
    type: String // ImageKit URL
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
