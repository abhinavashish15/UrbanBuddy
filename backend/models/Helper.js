const mongoose = require('mongoose')

// Helper model - separate collection with credentials and helper-specific data
const helperSchema = new mongoose.Schema({
  // Credentials
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
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ['helper'],
    default: 'helper',
  },
  // Helper-specific data
  bio: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  services: {
    type: [String],
    default: [],
  },
  hourlyRate: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  totalTasks: {
    type: Number,
    default: 0,
  },
  kycStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  kycDocuments: {
    type: [String],
    default: [],
  },
  portfolio: {
    type: [String],
    default: [],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  available: {
    type: Boolean,
    default: true,
  },
  languages: {
    type: [String],
    default: [],
  },
  responseTime: {
    type: String,
  },
  totalEarnings: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})

helperSchema.index({ email: 1 })
helperSchema.index({ city: 1 })
helperSchema.index({ kycStatus: 1 })
helperSchema.index({ verified: 1 })

module.exports = mongoose.model('Helper', helperSchema)

