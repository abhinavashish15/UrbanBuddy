const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  planId: {
    type: String,
    required: true,
  },
  planName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active',
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  cancelledAt: {
    type: Date,
  },
}, {
  timestamps: true,
})

subscriptionSchema.index({ userId: 1 })
subscriptionSchema.index({ status: 1 })

module.exports = mongoose.model('Subscription', subscriptionSchema)

