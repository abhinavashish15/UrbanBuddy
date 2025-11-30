const paymentService = require('../services/paymentService')
const { AppError } = require('../utils/errors')

const createSubscription = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const result = await paymentService.createSubscription(
      req.user.userId,
      req.body
    )
    res.status(201).json({
      success: true,
      data: result,
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

const createTaskPayment = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const payment = await paymentService.createTaskPayment(
      req.params.taskId,
      req.user.userId,
      req.body
    )
    res.status(201).json({
      success: true,
      data: payment,
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

const releaseEscrow = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const payout = await paymentService.releaseEscrow(
      req.params.taskId,
      req.user.userId
    )
    res.json({
      success: true,
      data: payout,
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

const getPayment = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id)
    res.json({
      success: true,
      data: payment,
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

const getUserSubscriptions = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const subscriptions = await paymentService.getUserSubscriptions(
      req.user.userId
    )
    res.json({
      success: true,
      data: subscriptions,
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

const getActiveSubscription = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const subscription = await paymentService.getActiveSubscription(
      req.user.userId
    )
    res.json({
      success: true,
      data: subscription,
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
  createSubscription,
  createTaskPayment,
  releaseEscrow,
  getPayment,
  getUserSubscriptions,
  getActiveSubscription,
}


