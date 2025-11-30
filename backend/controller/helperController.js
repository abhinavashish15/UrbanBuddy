const helperService = require('../services/helperService')
const { AppError } = require('../utils/errors')

const getHelper = async (req, res) => {
  try {
    const helper = await helperService.getHelperById(req.params.id)
    res.json({
      success: true,
      data: helper,
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

const getMyHelperProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    // req.user.userId is now the Helper document ID directly
    const helper = await helperService.getMyHelperProfile(req.user.userId)
    res.json({
      success: true,
      data: helper,
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

const updateHelper = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    // req.user.userId is now the Helper document ID directly
    const helper = await helperService.updateHelper(req.user.userId, req.body)
    res.json({
      success: true,
      data: helper,
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

const uploadKYCDocuments = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const { documents } = req.body
    // req.user.userId is now the Helper document ID directly
    const helper = await helperService.uploadKYCDocuments(
      req.user.userId,
      documents
    )
    res.json({
      success: true,
      data: helper,
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

const updatePortfolio = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    const { portfolio } = req.body
    // req.user.userId is now the Helper document ID directly
    const helper = await helperService.updatePortfolio(
      req.user.userId,
      portfolio
    )
    res.json({
      success: true,
      data: helper,
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

const searchHelpers = async (req, res) => {
  try {
    const filters = {
      city: req.query.city,
      services: req.query.services
        ? req.query.services.split(',')
        : undefined,
      minRating: req.query.minRating
        ? parseFloat(req.query.minRating)
        : undefined,
      available: req.query.available === 'true',
      page: req.query.page ? parseInt(req.query.page) : 1,
      limit: req.query.limit ? parseInt(req.query.limit) : 10,
    }

    const result = await helperService.searchHelpers(filters)
    res.json({
      success: true,
      data: result.helpers,
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

const getHelperTasks = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    // req.user.userId is now the Helper document ID directly
    const tasks = await helperService.getHelperTasks(req.user.userId)
    res.json({
      success: true,
      data: tasks,
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

const getHelperEarnings = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated',
      })
    }

    // req.user.userId is now the Helper document ID directly
    const result = await helperService.getHelperEarnings(req.user.userId)
    res.json({
      success: true,
      data: result,
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
  getHelper,
  getMyHelperProfile,
  updateHelper,
  uploadKYCDocuments,
  updatePortfolio,
  searchHelpers,
  getHelperTasks,
  getHelperEarnings,
}


