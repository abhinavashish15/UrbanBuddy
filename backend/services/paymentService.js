const { Payment, Subscription, Task } = require('../models')
const { AppError } = require('../utils/errors')

const createSubscription = async (userId, data) => {
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + data.duration)

  const subscription = await Subscription.create({
    userId,
    planId: data.planId,
    planName: data.planName,
    amount: data.amount,
    status: 'active',
    endDate,
  })

  const payment = await Payment.create({
    userId,
    amount: data.amount,
    type: 'subscription',
    status: 'completed',
    transactionId: `SUB-${Date.now()}`,
  })

  return { subscription, payment }
}

const createTaskPayment = async (taskId, userId, data) => {
  const task = await Task.findById(taskId)

  if (!task) {
    throw new AppError('Task not found', 404)
  }

  if (task.userId.toString() !== userId.toString()) {
    throw new AppError('Not authorized', 403)
  }

  const payment = await Payment.create({
    taskId,
    userId,
    amount: data.amount,
    type: 'task_payment',
    status: 'completed',
    transactionId: data.transactionId || `TASK-${Date.now()}`,
    paymentMethod: data.paymentMethod,
  })

  return payment
}

const releaseEscrow = async (taskId, userId) => {
  const task = await Task.findById(taskId).populate('helperId')

  if (!task) {
    throw new AppError('Task not found', 404)
  }

  const taskUserId = task.userId._id ? task.userId._id.toString() : task.userId.toString()
  if (taskUserId !== userId.toString()) {
    throw new AppError('Only task owner can release escrow', 403)
  }

  if (task.status !== 'completed') {
    throw new AppError('Task must be completed to release escrow', 400)
  }

  if (!task.helperId) {
    throw new AppError('Task has no assigned helper', 400)
  }

  // Calculate helper payout (budget - platform fee)
  const helperPayout = task.budget

  // Create payout payment for helper
  const payout = await Payment.create({
    helperId: task.helperId,
    userId: task.userId,
    taskId: task.id,
    amount: helperPayout,
    type: 'payout',
    status: 'completed',
    transactionId: `PAYOUT-${Date.now()}`,
  })

  return payout
}

const getPaymentById = async (paymentId) => {
  const payment = await Payment.findById(paymentId)
    .populate('taskId', 'title')
    .populate('userId', 'name email')
    .populate('helperId', 'name email')

  if (!payment) {
    throw new AppError('Payment not found', 404)
  }

  return payment
}

const getUserSubscriptions = async (userId) => {
  const subscriptions = await Subscription.find({ userId })
    .sort({ createdAt: -1 })

  return subscriptions
}

const getActiveSubscription = async (userId) => {
  const subscription = await Subscription.findOne({
    userId,
    status: 'active',
    endDate: { $gte: new Date() },
  }).sort({ createdAt: -1 })

  return subscription
}

module.exports = {
  createSubscription,
  createTaskPayment,
  releaseEscrow,
  getPaymentById,
  getUserSubscriptions,
  getActiveSubscription,
}
