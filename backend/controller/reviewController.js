const reviewService = require('../services/reviewService')
const { AppError } = require('../utils/errors')

const createReview = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const review = await reviewService.createReview(
      req.params.taskId,
      req.user.userId,
      req.body
    )
    res.status(201).json({
      success: true,
      data: review,
    })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        error: error.message,
      })
    }
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    })
  }
}

const getHelperReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsByHelper(req.params.helperId)
    res.json({
      success: true,
      data: reviews,
    })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        error: error.message,
      })
    }
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    })
  }
}

const getTaskReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsByTask(req.params.taskId)
    res.json({
      success: true,
      data: reviews,
    })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        error: error.message,
      })
    }
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    })
  }
}

module.exports = {
  createReview,
  getHelperReviews,
  getTaskReviews,
}


