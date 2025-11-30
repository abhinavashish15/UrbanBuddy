const mongoose = require('mongoose')

// User model - for regular users and admins only (separate from helpers)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  avatar: {
    type: String,
  },
  // User-specific data
  subscriptionStatus: {
    type: String,
    enum: ['active', 'expired', 'none'],
    default: 'none',
  },
  totalTasks: {
    type: Number,
    default: 0,
  },
  totalSpent: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})

userSchema.index({ email: 1 })
userSchema.index({ role: 1 })

module.exports = mongoose.model('User', userSchema)

