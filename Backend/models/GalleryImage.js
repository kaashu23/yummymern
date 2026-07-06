const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  image: {
    type: String, // ImageKit URL
    required: true
  },
  caption: {
    type: String
  },
  category: {
    type: String,
    enum: ['Food', 'Interior', 'Events']
  }
}, { timestamps: true });

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
