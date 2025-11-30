const { User, Helper } = require('../models')
const { hashPassword, comparePassword } = require('../utils/password')
const { generateToken } = require('../utils/jwt')
const { AppError } = require('../utils/errors')

// Register a regular user (not helper)
const registerUser = async (data) => {
  try {
    console.log('📝 Attempting to register user:', data.email)
    
    // Check if email exists in User collection
    const existingUser = await User.findOne({ email: data.email })
    if (existingUser) {
      console.log('❌ User already exists:', data.email)
      throw new AppError('User already exists', 400)
    }

    // Check if email exists in Helper collection
    const existingHelper = await Helper.findOne({ email: data.email })
    if (existingHelper) {
      console.log('❌ Email already registered as helper:', data.email)
      throw new AppError('Email already registered as helper', 400)
    }

    const hashedPassword = await hashPassword(data.password)

    console.log('💾 Creating user in database...')
    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      role: data.role || 'user',
    })

    console.log('✅ User created successfully:', user._id, user.email)

    const userObj = user.toObject()
    delete userObj.password

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: 'user',
      type: 'user',
    })

    return { user: userObj, token }
  } catch (error) {
    console.error('❌ Error in registerUser:', error.message)
    if (error.name === 'ValidationError') {
      console.error('Validation errors:', error.errors)
    }
    throw error
  }
}

// Register a helper (separate collection)
const registerHelper = async (data) => {
  try {
    console.log('📝 Attempting to register helper:', data.email)
    
    // Check if email exists in Helper collection
    const existingHelper = await Helper.findOne({ email: data.email })
    if (existingHelper) {
      console.log('❌ Helper already exists:', data.email)
      throw new AppError('Helper already exists', 400)
    }

    // Check if email exists in User collection
    const existingUser = await User.findOne({ email: data.email })
    if (existingUser) {
      console.log('❌ Email already registered as user:', data.email)
      throw new AppError('Email already registered as user', 400)
    }

    if (!data.city) {
      throw new AppError('City is required for helpers', 400)
    }

    const hashedPassword = await hashPassword(data.password)

    console.log('💾 Creating helper in database...')
    const helper = await Helper.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      role: 'helper',
      city: data.city,
      services: [],
    })

    console.log('✅ Helper created successfully:', helper._id, helper.email)

    const helperObj = helper.toObject()
    delete helperObj.password
    
    // Ensure role is set
    helperObj.role = 'helper'

    const token = generateToken({
      userId: helper._id.toString(),
      email: helper.email,
      role: 'helper',
      type: 'helper',
    })

    return { user: helperObj, token }
  } catch (error) {
    console.error('❌ Error in registerHelper:', error.message)
    if (error.name === 'ValidationError') {
      console.error('Validation errors:', error.errors)
    }
    throw error
  }
}

// Unified registration - routes to appropriate function based on role
const register = async (data) => {
  if (data.role === 'helper') {
    return await registerHelper(data)
  } else {
    return await registerUser(data)
  }
}

// Login - checks both User and Helper collections
const loginUser = async (email, password) => {
  try {
    console.log('🔐 Attempting login for:', email)
    
    // Try to find in User collection first
    let account = await User.findOne({ email })
    let accountType = 'user'
    
    // If not found in User, try Helper collection
    if (!account) {
      account = await Helper.findOne({ email })
      accountType = 'helper'
    }

    if (!account) {
      console.log('❌ Account not found:', email)
      throw new AppError('Invalid credentials', 401)
    }

    const isPasswordValid = await comparePassword(password, account.password)

    if (!isPasswordValid) {
      console.log('❌ Invalid password for:', email)
      throw new AppError('Invalid credentials', 401)
    }

    console.log('✅ Login successful for:', email, 'Type:', accountType)

    const token = generateToken({
      userId: account._id.toString(),
      email: account.email,
      role: accountType === 'helper' ? 'helper' : (account.role || 'user'),
      type: accountType,
    })

    const accountObj = account.toObject ? account.toObject() : { ...account }
    delete accountObj.password
    
    // Ensure role is set correctly - critical for frontend redirects
    if (accountType === 'helper') {
      accountObj.role = 'helper'
    } else if (!accountObj.role) {
      accountObj.role = account.role || 'user'
    }
    
    // Also set type for consistency
    accountObj.type = accountType

    return { user: accountObj, token }
  } catch (error) {
    console.error('❌ Error in loginUser:', error.message)
    throw error
  }
}

// Get current user/helper based on token
const getCurrentUser = async (userId, accountType) => {
  try {
    let account
    
    if (accountType === 'helper') {
      account = await Helper.findById(userId).select('-password')
      if (!account) {
        throw new AppError('Helper not found', 404)
      }
      // Ensure role is set for helpers
      const accountObj = account.toObject ? account.toObject() : account
      if (!accountObj.role) {
        accountObj.role = 'helper'
      }
      return accountObj
    } else {
      account = await User.findById(userId).select('-password')
      if (!account) {
        throw new AppError('User not found', 404)
      }
      return account
    }
  } catch (error) {
    console.error('❌ Error in getCurrentUser:', error.message)
    throw error
  }
}

module.exports = {
  register,
  registerUser,
  registerHelper,
  loginUser,
  getCurrentUser,
}
