const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  helperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Helper',
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['subscription', 'task_payment', 'payout'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  transactionId: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
}, {
  timestamps: true,
})

paymentSchema.index({ userId: 1 })
paymentSchema.index({ helperId: 1 })
paymentSchema.index({ taskId: 1 })
paymentSchema.index({ status: 1 })

module.exports = mongoose.model('Payment', paymentSchema)

