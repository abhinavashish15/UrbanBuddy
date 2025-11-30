const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  helperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Helper',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  budget: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled', 'disputed'],
    default: 'pending',
  },
  scheduledAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  images: {
    type: [String],
    default: [],
  },
  escrowAmount: {
    type: Number,
  },
  platformFee: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})

taskSchema.index({ userId: 1 })
taskSchema.index({ helperId: 1 })
taskSchema.index({ city: 1 })
taskSchema.index({ status: 1 })

module.exports = mongoose.model('Task', taskSchema)

