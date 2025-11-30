const authService = require('../services/authService')
const { AppError } = require('../utils/errors')

const register = async (req, res) => {
  try {
    let result
    if (req.body.role === 'helper') {
      result = await authService.registerHelper(req.body)
    } else {
      result = await authService.registerUser(req.body)
    }
    res.status(201).json({
      success: true,
      data: { user: result.user, token: result.token },
    })
  } catch (error) {
    console.error('Registration error:', error)
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        error: error.message,
      })
    }
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const { user, token } = await authService.loginUser(email, password)
    res.json({
      success: true,
      data: { user, token },
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

const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const accountType = req.user.type || (req.user.role === 'helper' ? 'helper' : 'user')
    const user = await authService.getCurrentUser(req.user.userId, accountType)
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

module.exports = {
  register,
  login,
  getMe,
}


