const { Router } = require('express')
const helperController = require('../controller/helperController')
const { authenticate, authorize } = require('../middleware/auth')

const router = Router()

router.get('/search', helperController.searchHelpers)
router.get('/:id', helperController.getHelper)
router.get('/profile/me', authenticate, authorize('helper'), helperController.getMyHelperProfile)
router.put('/profile/me', authenticate, authorize('helper'), helperController.updateHelper)
router.post('/kyc/upload', authenticate, authorize('helper'), helperController.uploadKYCDocuments)
router.put('/portfolio', authenticate, authorize('helper'), helperController.updatePortfolio)
router.get('/tasks/my', authenticate, authorize('helper'), helperController.getHelperTasks)
router.get('/earnings/my', authenticate, authorize('helper'), helperController.getHelperEarnings)

module.exports = router

