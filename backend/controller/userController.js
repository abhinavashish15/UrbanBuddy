const userService = require('../services/userService')
const { AppError } = require('../utils/errors')

const getUser = async (req, res) => {
  try {
    const userId = req.params.id || req.user?.userId
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const user = await userService.getUserById(userId)
    res.json({
      success: true,
      data: user,
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

const updateUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const user = await userService.updateUser(req.user.userId, req.body)
    res.json({
      success: true,
      data: user,
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

const changePassword = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const { currentPassword, newPassword } = req.body
    const result = await userService.changePassword(
      req.user.userId,
      currentPassword,
      newPassword
    )
    res.json({
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

const getUserTasks = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const tasks = await userService.getUserTasks(req.user.userId)
    res.json({
      success: true,
      data: tasks,
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

const getUserPayments = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const payments = await userService.getUserPayments(req.user.userId)
    res.json({
      success: true,
      data: payments,
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
  getUser,
  updateUser,
  changePassword,
  getUserTasks,
  getUserPayments,
}


