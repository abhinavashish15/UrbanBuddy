const { Helper, Task, Payment } = require('../models')
const { AppError } = require('../utils/errors')

const getHelperById = async (helperId) => {
  const helper = await Helper.findById(helperId).select('-password')

  if (!helper) {
    throw new AppError('Helper not found', 404)
  }

  return helper
}

const getHelperByUserId = async (helperId) => {
  // Now helperId is the actual Helper document ID (not User ID)
  const helper = await Helper.findById(helperId).select('-password')

  if (!helper) {
    throw new AppError('Helper profile not found', 404)
  }

  return helper
}

const getMyHelperProfile = async (helperId) => {
  const helper = await Helper.findById(helperId).select('-password')

  if (!helper) {
    throw new AppError('Helper profile not found', 404)
  }

  return helper
}

const updateHelper = async (helperId, data) => {
  // Don't allow password updates through this method
  const { password, ...updateData } = data
  
  const helper = await Helper.findByIdAndUpdate(
    helperId,
    updateData,
    { new: true, runValidators: true }
  ).select('-password')

  if (!helper) {
    throw new AppError('Helper profile not found', 404)
  }

  return helper
}

const uploadKYCDocuments = async (helperId, documents) => {
  const helper = await Helper.findByIdAndUpdate(
    helperId,
    {
      kycDocuments: documents,
      kycStatus: 'pending',
    },
    { new: true }
  ).select('-password')

  if (!helper) {
    throw new AppError('Helper profile not found', 404)
  }

  return helper
}

const updatePortfolio = async (helperId, portfolio) => {
  const helper = await Helper.findByIdAndUpdate(
    helperId,
    { portfolio },
    { new: true }
  ).select('-password')

  if (!helper) {
    throw new AppError('Helper profile not found', 404)
  }

  return helper
}

const searchHelpers = async (filters) => {
  const page = filters.page || 1
  const limit = filters.limit || 10
  const skip = (page - 1) * limit

  const query = {
    verified: true,
    kycStatus: 'verified',
  }

  if (filters.city) {
    query.city = filters.city
  }

  if (filters.services && filters.services.length > 0) {
    query.services = { $in: filters.services }
  }

  if (filters.minRating) {
    query.rating = { $gte: filters.minRating }
  }

  if (filters.available !== undefined) {
    query.available = filters.available
  }

  const [helpers, total] = await Promise.all([
    Helper.find(query)
      .select('-password')
      .sort({ rating: -1 })
      .skip(skip)
      .limit(limit),
    Helper.countDocuments(query),
  ])

  return {
    helpers,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  }
}

const getHelperTasks = async (helperId) => {
  const tasks = await Task.find({ helperId })
    .populate('userId', 'name email avatar')
    .sort({ createdAt: -1 })

  return tasks
}

const getHelperEarnings = async (helperId) => {
  const earnings = await Payment.find({
    helperId,
    type: 'task_payment',
    status: 'completed',
  })
    .populate('task', 'id title')
    .sort({ createdAt: -1 })

  const totalEarnings = earnings.reduce((sum, payment) => sum + (payment.amount || 0), 0)

  return {
    earnings,
    totalEarnings,
  }
}

module.exports = {
  getHelperById,
  getHelperByUserId,
  getMyHelperProfile,
  updateHelper,
  uploadKYCDocuments,
  updatePortfolio,
  searchHelpers,
  getHelperTasks,
  getHelperEarnings,
}
