const { Review, Task, Helper } = require('../models')
const { AppError } = require('../utils/errors')

const createReview = async (taskId, userId, data) => {
  const task = await Task.findById(taskId).populate('helper')

  if (!task) {
    throw new AppError('Task not found', 404)
  }

  const taskUserId = task.userId._id ? task.userId._id.toString() : task.userId.toString()
  if (taskUserId !== userId.toString()) {
    throw new AppError('Only task owner can create review', 403)
  }

  if (task.status !== 'completed') {
    throw new AppError('Can only review completed tasks', 400)
  }

  if (!task.helperId) {
    throw new AppError('Task has no assigned helper', 400)
  }

  // Check if review already exists
  const existingReview = await Review.findOne({
    taskId,
    userId,
  })

  if (existingReview) {
    throw new AppError('Review already exists for this task', 400)
  }

  const review = await Review.create({
    taskId,
    userId,
    helperId: task.helperId,
    rating: data.rating,
    comment: data.comment,
  })

  const populatedReview = await Review.findById(review._id)
    .populate('userId', 'name avatar')

  // Update helper rating
  const helperReviews = await Review.find({ helperId: task.helperId })
  const totalRating = helperReviews.reduce((sum, r) => sum + r.rating, 0)
  const averageRating = totalRating / helperReviews.length

  await Helper.findByIdAndUpdate(task.helperId, {
    rating: averageRating,
    totalReviews: helperReviews.length,
  })

  return populatedReview
}

const getReviewsByHelper = async (helperId) => {
  const reviews = await Review.find({ helperId })
    .populate('userId', 'name avatar')
    .populate('taskId', 'title serviceType')
    .sort({ createdAt: -1 })

  return reviews
}

const getReviewsByTask = async (taskId) => {
  const reviews = await Review.find({ taskId })
    .populate('userId', 'name avatar')
    .sort({ createdAt: -1 })

  return reviews
}

module.exports = {
  createReview,
  getReviewsByHelper,
  getReviewsByTask,
}
