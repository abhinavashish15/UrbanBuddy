const { Router } = require('express')
const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')
const helperRoutes = require('./helperRoutes')
const taskRoutes = require('./taskRoutes')
const reviewRoutes = require('./reviewRoutes')
const paymentRoutes = require('./paymentRoutes')

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/helpers', helperRoutes)
router.use('/tasks', taskRoutes)
router.use('/reviews', reviewRoutes)
router.use('/payments', paymentRoutes)

module.exports = router

