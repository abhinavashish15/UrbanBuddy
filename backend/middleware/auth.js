const { verifyToken } = require('../utils/jwt')
const { AppError } = require('../utils/errors')

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401)
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    req.user = decoded
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token', 401))
    }
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expired', 401))
    }
    next(error)
  }
}

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Not authenticated', 401))
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Not authorized', 403))
    }

    next()
  }
}

module.exports = { authenticate, authorize }


