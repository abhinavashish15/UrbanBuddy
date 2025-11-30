const mongoose = require('mongoose')
const { config } = require('./env')

const connectDB = async () => {
  try {
    if (!config.databaseUrl) {
      throw new Error('DATABASE_URL is not set in environment variables')
    }

    await mongoose.connect(config.databaseUrl)
    console.log('✅ MongoDB connected successfully')
    console.log(`📊 Database: ${mongoose.connection.name}`)
    console.log(`🔗 Host: ${mongoose.connection.host}`)
    
    return mongoose.connection
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    console.error('💡 Check your DATABASE_URL in .env file')
    throw error
  }
}

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected')
})

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err)
})

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connection established')
})

module.exports = { connectDB, mongoose }
