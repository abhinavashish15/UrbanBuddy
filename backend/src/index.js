const express = require('express')
const cors = require('cors')
const { config } = require('../config/env')
const { connectDB } = require('../config/database')
const routes = require('../routes')
const { errorHandler } = require('../utils/errors')

const app = express()

// Connect to MongoDB before starting server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB()

    // Start server only after database connection
    const PORT = config.port

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
      console.log(`📝 Environment: ${config.nodeEnv}`)
      console.log(`🔗 Database: Connected`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

// Middleware
// Normalize frontend URL (remove trailing slash)
const normalizedFrontendUrl = config.frontendUrl?.replace(/\/$/, '')

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)

    // Normalize origin (remove trailing slash)
    const normalizedOrigin = origin.replace(/\/$/, '')

    // Check if origin matches (with or without trailing slash)
    if (normalizedOrigin === normalizedFrontendUrl || origin === normalizedFrontendUrl) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api', routes)

// Error handler
app.use(errorHandler)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  })
})

// Start server
startServer()

