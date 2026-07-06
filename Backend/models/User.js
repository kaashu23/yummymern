const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
