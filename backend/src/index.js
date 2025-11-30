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
app.use(cors({
  origin: config.frontendUrl,
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

