const { Router } = require('express')
const paymentController = require('../controller/paymentController')
const { authenticate } = require('../middleware/auth')

const router = Router()

router.post('/subscription', authenticate, paymentController.createSubscription)
router.post('/task/:taskId', authenticate, paymentController.createTaskPayment)
router.post('/task/:taskId/release', authenticate, paymentController.releaseEscrow)
router.get('/:id', authenticate, paymentController.getPayment)
router.get('/subscriptions/all', authenticate, paymentController.getUserSubscriptions)
router.get('/subscription/active', authenticate, paymentController.getActiveSubscription)

module.exports = router

