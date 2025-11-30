const { User, Task, Payment } = require('../models')
const { AppError } = require('../utils/errors')
const { hashPassword, comparePassword } = require('../utils/password')

const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password')

  if (!user) {
    throw new AppError('User not found', 404)
  }

  return user
}

const updateUser = async (userId, data) => {
  const user = await User.findByIdAndUpdate(
    userId,
    data,
    { new: true, runValidators: true }
  ).select('-password')

  if (!user) {
    throw new AppError('User not found', 404)
  }

  return user
}

const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId)

  if (!user) {
    throw new AppError('User not found', 404)
  }

  const isPasswordValid = await comparePassword(currentPassword, user.password)

  if (!isPasswordValid) {
    throw new AppError('Current password is incorrect', 400)
  }

  const hashedPassword = await hashPassword(newPassword)

  await User.findByIdAndUpdate(userId, { password: hashedPassword })

  return { message: 'Password updated successfully' }
}

const getUserTasks = async (userId) => {
  const tasks = await Task.find({ userId })
    .populate('helperId', 'name email avatar bio city rating')
    .sort({ createdAt: -1 })

  return tasks
}

const getUserPayments = async (userId) => {
  const payments = await Payment.find({ userId })
    .populate('taskId', 'title')
    .sort({ createdAt: -1 })

  return payments
}

module.exports = {
  getUserById,
  updateUser,
  changePassword,
  getUserTasks,
  getUserPayments,
}
