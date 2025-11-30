const taskService = require('../services/taskService')
const helperService = require('../services/helperService')
const { AppError } = require('../utils/errors')

const createTask = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const taskData = {
      ...req.body,
      scheduledAt: req.body.scheduledAt
        ? new Date(req.body.scheduledAt)
        : undefined,
    }

    const task = await taskService.createTask(req.user.userId, taskData)
    res.status(201).json({
      success: true,
      data: task,
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

const getTask = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id)
    res.json({
      success: true,
      data: task,
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

const updateTask = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const updateData = {
      ...req.body,
      scheduledAt: req.body.scheduledAt
        ? new Date(req.body.scheduledAt)
        : undefined,
    }

    const task = await taskService.updateTask(
      req.params.id,
      req.user.userId,
      updateData
    )
    res.json({
      success: true,
      data: task,
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

const acceptTask = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const helper = await helperService.getHelperByUserId(req.user.userId)
    const task = await taskService.acceptTask(req.params.id, helper.id)
    res.json({
      success: true,
      data: task,
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

const updateTaskStatus = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const { status } = req.body
    const task = await taskService.updateTaskStatus(
      req.params.id,
      status,
      req.user.userId
    )
    res.json({
      success: true,
      data: task,
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

const searchTasks = async (req, res) => {
  try {
    const filters = {
      city: req.query.city,
      serviceType: req.query.serviceType,
      status: req.query.status,
      minBudget: req.query.minBudget
        ? parseFloat(req.query.minBudget)
        : undefined,
      maxBudget: req.query.maxBudget
        ? parseFloat(req.query.maxBudget)
        : undefined,
      page: req.query.page ? parseInt(req.query.page) : 1,
      limit: req.query.limit ? parseInt(req.query.limit) : 10,
    }

    const result = await taskService.searchTasks(filters)
    res.json({
      success: true,
      data: result.tasks,
      pagination: result.pagination,
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
  createTask,
  getTask,
  updateTask,
  acceptTask,
  updateTaskStatus,
  searchTasks,
}


