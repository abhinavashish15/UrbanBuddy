import { apiClient } from '../api'
import type { User, Task, Payment } from '@/types'

export const usersApi = {
  getUserById: async (id: string) => {
    return apiClient.get<User>(`/users/${id}`)
  },

  updateUser: async (id: string, data: Partial<User>) => {
    return apiClient.put<User>(`/users/${id}`, data)
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    return apiClient.post<{ message: string }>('/users/change-password', {
      currentPassword,
      newPassword,
    })
  },

  getUserTasks: async () => {
    return apiClient.get<Task[]>('/users/tasks/all')
  },

  getUserPayments: async () => {
    return apiClient.get<Payment[]>('/users/payments/all')
  },
}

