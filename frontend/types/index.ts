export type UserRole = 'user' | 'helper' | 'admin'

export type TaskStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'disputed'

export type SubscriptionStatus = 'active' | 'expired' | 'cancelled'

export type KYCStatus = 'pending' | 'verified' | 'rejected'

export interface User {
  _id?: string
  id?: string
  name: string
  email: string
  phone?: string
  role: UserRole
  avatar?: string
  createdAt?: Date | string
  subscriptionStatus?: SubscriptionStatus
  subscriptionExpiresAt?: Date | string
}

export interface Helper {
  _id?: string
  id?: string
  userId?: string
  user?: User
  bio?: string
  city: string
  services: string[]
  hourlyRate: number
  rating: number
  totalReviews: number
  totalTasks: number
  kycStatus: KYCStatus
  portfolio?: string[]
  verified: boolean
  available: boolean
  languages: string[]
  responseTime?: string
  createdAt?: Date | string
}

export interface Task {
  _id?: string
  id?: string
  userId: string
  helperId?: string
  user?: User
  helper?: Helper
  title: string
  description: string
  serviceType: string
  address?: string
  city: string
  latitude?: number
  longitude?: number
  budget: number
  status: TaskStatus
  scheduledAt?: Date | string
  completedAt?: Date | string
  createdAt?: Date | string
  images?: string[]
  escrowAmount?: number
  platformFee?: number
}

export interface Review {
  _id?: string
  id?: string
  taskId: string
  userId: string
  helperId: string
  user?: User
  rating: number
  comment: string
  createdAt?: Date | string
}

export interface Payment {
  _id?: string
  id?: string
  taskId?: string
  userId: string
  helperId?: string
  amount: number
  type: 'subscription' | 'task_payment' | 'payout'
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  createdAt?: Date | string
  transactionId?: string
  paymentMethod?: string
}

export interface City {
  id: string
  name: string
  state: string
  coordinates: {
    lat: number
    lng: number
  }
  helperCount: number
}


