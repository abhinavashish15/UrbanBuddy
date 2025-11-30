const { Router } = require('express')
const taskController = require('../controller/taskController')
const { authenticate } = require('../middleware/auth')
const { validate } = require('../middleware/validate')
const { taskSchema } = require('../utils/validation')

const router = Router()

router.get('/search', taskController.searchTasks)
router.get('/:id', taskController.getTask)
router.post('/', authenticate, validate(taskSchema), taskController.createTask)
router.put('/:id', authenticate, taskController.updateTask)
router.post('/:id/accept', authenticate, taskController.acceptTask)
router.patch('/:id/status', authenticate, taskController.updateTaskStatus)

module.exports = router

