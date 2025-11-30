// Test MongoDB connection
require('dotenv').config()
const { connectDB, mongoose } = require('./config/database')
const { User } = require('./models')

async function testConnection() {
  try {
    console.log('🔍 Testing MongoDB connection...')
    console.log('📝 DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'NOT SET')
    
    await connectDB()
    
    console.log('\n📊 Testing database operations...')
    
    // Test creating a user
    const testUser = await User.create({
      name: 'Test User',
      email: `test-${Date.now()}@test.com`,
      password: 'test123456',
      role: 'user',
    })
    
    console.log('✅ Test user created:', testUser._id)
    
    // Test reading
    const foundUser = await User.findById(testUser._id)
    console.log('✅ Test user found:', foundUser ? foundUser.email : 'NOT FOUND')
    
    // Test deleting
    await User.findByIdAndDelete(testUser._id)
    console.log('✅ Test user deleted')
    
    // Count users
    const userCount = await User.countDocuments()
    console.log(`\n📈 Total users in database: ${userCount}`)
    
    console.log('\n✅ All tests passed! Database is working correctly.')
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Test failed:', error.message)
    console.error('Full error:', error)
    process.exit(1)
  }
}

testConnection()

