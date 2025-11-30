const { Router } = require('express')
const reviewController = require('../controller/reviewController')
const { authenticate } = require('../middleware/auth')
const { validate } = require('../middleware/validate')
const { reviewSchema } = require('../utils/validation')

const router = Router()

router.post('/task/:taskId', authenticate, validate(reviewSchema), reviewController.createReview)
router.get('/helper/:helperId', reviewController.getHelperReviews)
router.get('/task/:taskId', reviewController.getTaskReviews)

module.exports = router

