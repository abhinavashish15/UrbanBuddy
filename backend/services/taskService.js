const { Task, Subscription } = require('../models')
const { AppError } = require('../utils/errors')

const createTask = async (userId, data) => {
  // Check if user has active subscription
  const activeSubscription = await Subscription.findOne({
    userId,
    status: 'active',
    endDate: { $gte: new Date() },
  })

  if (!activeSubscription) {
    throw new AppError('Active subscription required to create tasks', 403)
  }

  // Calculate platform fee (5% of budget)
  const platformFee = data.budget * 0.05
  const escrowAmount = data.budget + platformFee

  const task = await Task.create({
    userId,
    title: data.title,
    description: data.description,
    serviceType: data.serviceType,
    address: data.address,
    city: data.city,
    latitude: data.latitude,
    longitude: data.longitude,
    budget: data.budget,
    platformFee,
    escrowAmount,
    scheduledAt: data.scheduledAt,
    images: data.images || [],
    status: 'pending',
  })

  const populatedTask = await Task.findById(task._id)
    .populate('userId', 'name email avatar')
    .populate('helperId', 'name email avatar bio city rating')

  return populatedTask
}

const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId)
    .populate('userId', 'name email avatar')
    .populate('helperId', 'name email avatar bio city rating')
    .populate({
      path: 'reviews',
      populate: {
        path: 'userId',
        select: 'name avatar',
      },
    })

  if (!task) {
    throw new AppError('Task not found', 404)
  }

  return task
}

const updateTask = async (taskId, userId, data) => {
  const task = await Task.findById(taskId)

  if (!task) {
    throw new AppError('Task not found', 404)
  }

  if (task.userId._id ? task.userId._id.toString() !== userId.toString() : task.userId.toString() !== userId.toString()) {
    throw new AppError('Not authorized to update this task', 403)
  }

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    data,
    { new: true, runValidators: true }
  )
    .populate('userId', 'name email avatar')
    .populate('helperId', 'name email avatar bio city rating')

  return updatedTask
}

const acceptTask = async (taskId, helperId) => {
  const task = await Task.findById(taskId)

  if (!task) {
    throw new AppError('Task not found', 404)
  }

  if (task.status !== 'pending') {
    throw new AppError('Task is not available', 400)
  }

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    {
      helperId,
      status: 'accepted',
    },
    { new: true }
  )
    .populate('userId', 'name email avatar')
    .populate('helperId', 'name email avatar bio city rating')

  return updatedTask
}

const updateTaskStatus = async (taskId, status, userId) => {
  const task = await Task.findById(taskId)

  if (!task) {
    throw new AppError('Task not found', 404)
  }

  // Check authorization
  const taskUserId = task.userId._id ? task.userId._id.toString() : task.userId.toString()
  const taskHelperId = task.helperId ? (task.helperId._id ? task.helperId._id.toString() : task.helperId.toString()) : null
  
  if (taskUserId !== userId.toString() && 
      (!taskHelperId || taskHelperId !== userId.toString())) {
    throw new AppError('Not authorized', 403)
  }

  const updateData = { status }

  if (status === 'completed') {
    updateData.completedAt = new Date()
  }

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    updateData,
    { new: true }
  )
    .populate('userId', 'name email avatar')
    .populate('helperId', 'name email avatar bio city rating')

  return updatedTask
}

const searchTasks = async (filters) => {
  const page = filters.page || 1
  const limit = filters.limit || 10
  const skip = (page - 1) * limit

  const query = {}

  if (filters.city) {
    query.city = filters.city
  }

  if (filters.serviceType) {
    query.serviceType = filters.serviceType
  }

  if (filters.status) {
    query.status = filters.status
  }

  if (filters.minBudget || filters.maxBudget) {
    query.budget = {}
    if (filters.minBudget) {
      query.budget.$gte = filters.minBudget
    }
    if (filters.maxBudget) {
      query.budget.$lte = filters.maxBudget
    }
  }

  const [tasks, total] = await Promise.all([
    Task.find(query)
      .populate('userId', 'name email avatar')
      .populate('helperId', 'name email avatar bio city rating')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Task.countDocuments(query),
  ])

  return {
    tasks,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  }
}

module.exports = {
  createTask,
  getTaskById,
  updateTask,
  acceptTask,
  updateTaskStatus,
  searchTasks,
}
