import { apiClient } from '../api'
import type { Payment } from '@/types'

export interface CreateSubscriptionData {
  planId: string
  planName: string
  amount: number
  duration: number // days
}

export interface CreateTaskPaymentData {
  amount: number
  transactionId?: string
  paymentMethod?: string
}

export interface Subscription {
  id: string
  userId: string
  planId: string
  planName: string
  amount: number
  status: 'active' | 'expired' | 'cancelled'
  startDate: Date
  endDate: Date
  createdAt: Date
}

export const paymentsApi = {
  createSubscription: async (data: CreateSubscriptionData) => {
    return apiClient.post<{ subscription: Subscription; payment: Payment }>(
      '/payments/subscription',
      data
    )
  },

  createTaskPayment: async (taskId: string, data: CreateTaskPaymentData) => {
    return apiClient.post<Payment>(`/payments/task/${taskId}`, data)
  },

  releaseEscrow: async (taskId: string) => {
    return apiClient.post<Payment>(`/payments/task/${taskId}/release`)
  },

  getPaymentById: async (id: string) => {
    return apiClient.get<Payment>(`/payments/${id}`)
  },

  getUserSubscriptions: async () => {
    return apiClient.get<Subscription[]>('/payments/subscriptions/all')
  },

  getActiveSubscription: async () => {
    return apiClient.get<Subscription>('/payments/subscription/active')
  },
}

