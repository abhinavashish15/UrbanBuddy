const { z } = require('zod')

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
  role: z.enum(['user', 'helper', 'admin']).default('user'),
  city: z.string().optional(),
}).refine((data) => {
  // City is required if role is helper
  if (data.role === 'helper') {
    return !!data.city && data.city.trim().length > 0
  }
  return true
}, {
  message: 'City is required for helpers',
  path: ['city'],
})

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  serviceType: z.string().min(1, 'Service type is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  budget: z.number().positive('Budget must be positive'),
  scheduledAt: z.string().datetime().optional(),
})

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(5, 'Comment must be at least 5 characters'),
})

const helperUpdateSchema = z.object({
  bio: z.string().optional(),
  city: z.string().optional(),
  services: z.array(z.string()).optional(),
  hourlyRate: z.number().positive().optional(),
  languages: z.array(z.string()).optional(),
  available: z.boolean().optional(),
})

module.exports = {
  registerSchema,
  loginSchema,
  taskSchema,
  reviewSchema,
  helperUpdateSchema,
}


