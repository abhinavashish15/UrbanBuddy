const { Router } = require('express')
const authController = require('../controller/authController')
const { authenticate } = require('../middleware/auth')
const { validate } = require('../middleware/validate')
const { registerSchema, loginSchema } = require('../utils/validation')

const router = Router()

router.post('/register', validate(registerSchema), authController.register)
router.post('/login', validate(loginSchema), authController.login)
router.get('/me', authenticate, authController.getMe)

module.exports = router

