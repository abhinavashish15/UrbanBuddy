const mongoose = require('mongoose')

const disputeSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
    unique: true,
  },
  raisedBy: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'open',
  },
  resolution: {
    type: String,
  },
  resolvedBy: {
    type: String,
  },
  resolvedAt: {
    type: Date,
  },
}, {
  timestamps: true,
})

disputeSchema.index({ status: 1 })

module.exports = mongoose.model('Dispute', disputeSchema)

