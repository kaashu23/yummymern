const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
  bio: {
    type: String
  },
  photo: {
    type: String // ImageKit URL
  },
  socials: {
    instagram: String,
    linkedin: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Chef', chefSchema);
