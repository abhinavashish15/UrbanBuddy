const { z } = require('zod')
const { AppError } = require('../utils/errors')

const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }))
        return next(new AppError(`Validation failed: ${errors[0].message}`, 400))
      }
      next(error)
    }
  }
}

module.exports = { validate }


