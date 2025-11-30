const { User, Helper } = require('../models')
const { hashPassword } = require('../utils/password')
const { connectDB } = require('../config/database')

const seedDatabase = async () => {
  try {
    await connectDB()
    console.log('🌱 Seeding database...')

    // Create admin user
    const adminPassword = await hashPassword('admin123')
    const admin = await User.findOneAndUpdate(
      { email: 'admin@urbanbuddy.com' },
      {
        name: 'Admin User',
        email: 'admin@urbanbuddy.com',
        password: adminPassword,
        role: 'admin',
      },
      { upsert: true, new: true }
    )
    console.log('✅ Created admin user')

    // Create test user
    const userPassword = await hashPassword('user123')
    const user = await User.findOneAndUpdate(
      { email: 'user@test.com' },
      {
        name: 'Test User',
        email: 'user@test.com',
        password: userPassword,
        role: 'user',
        phone: '+1234567890',
      },
      { upsert: true, new: true }
    )
    console.log('✅ Created test user')

    // Create test helper
    const helperPassword = await hashPassword('helper123')
    const helperUser = await User.findOneAndUpdate(
      { email: 'helper@test.com' },
      {
        name: 'Test Helper',
        email: 'helper@test.com',
        password: helperPassword,
        role: 'helper',
        phone: '+1234567891',
      },
      { upsert: true, new: true }
    )

    const helper = await Helper.findOneAndUpdate(
      { userId: helperUser._id },
      {
        userId: helperUser._id,
        city: 'Mumbai',
        services: ['Flat Visit & Inspection', 'Photo & Video Documentation'],
        hourlyRate: 500,
        rating: 4.5,
        totalReviews: 10,
        totalTasks: 25,
        kycStatus: 'verified',
        verified: true,
        available: true,
        languages: ['English', 'Hindi', 'Marathi'],
        bio: 'Experienced helper with 5+ years in Mumbai real estate.',
      },
      { upsert: true, new: true }
    )
    console.log('✅ Created test helper')

    console.log('✨ Seeding completed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seedDatabase()

