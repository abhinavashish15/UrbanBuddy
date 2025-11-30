const { Router } = require('express')
const userController = require('../controller/userController')
const { authenticate } = require('../middleware/auth')

const router = Router()

router.get('/:id', authenticate, userController.getUser)
router.get('/', authenticate, userController.getUser)
router.put('/', authenticate, userController.updateUser)
router.post('/change-password', authenticate, userController.changePassword)
router.get('/tasks/all', authenticate, userController.getUserTasks)
router.get('/payments/all', authenticate, userController.getUserPayments)

module.exports = router

