import { apiClient, type ApiResponse } from '../api'
import type { User } from '@/types'

export interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
  role?: 'user' | 'helper'
  city?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}

export const authApi = {
  register: async (data: RegisterData) => {
    const response = await apiClient.post<{ user: User; token: string }>('/auth/register', data)
    if (response.success && response.data) {
      apiClient.setToken(response.data.token)
      return {
        success: true,
        data: {
          user: response.data.user,
          token: response.data.token,
        },
      }
    }
    return response as ApiResponse<AuthResponse>
  },

  login: async (data: LoginData) => {
    const response = await apiClient.post<{ user: User; token: string }>('/auth/login', data)
    if (response.success && response.data) {
      apiClient.setToken(response.data.token)
      return {
        success: true,
        data: {
          user: response.data.user,
          token: response.data.token,
        },
      }
    }
    return response as ApiResponse<AuthResponse>
  },

  getCurrentUser: async () => {
    return apiClient.get<User>('/auth/me')
  },

  logout: () => {
    apiClient.setToken(null)
  },
}

