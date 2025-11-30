import { apiClient } from '../api'
import type { Helper, Task, Payment } from '@/types'

export interface SearchHelpersParams {
  city?: string
  services?: string[]
  minRating?: number
  available?: boolean
  page?: number
  limit?: number
}

export interface SearchHelpersResponse {
  helpers: Helper[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface HelperEarningsResponse {
  earnings: Payment[]
  totalEarnings: number
}

export const helpersApi = {
  searchHelpers: async (params: SearchHelpersParams) => {
    const queryParams = new URLSearchParams()
    if (params.city) queryParams.append('city', params.city)
    if (params.services) params.services.forEach(s => queryParams.append('services', s))
    if (params.minRating) queryParams.append('minRating', params.minRating.toString())
    if (params.available !== undefined) queryParams.append('available', params.available.toString())
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.limit) queryParams.append('limit', params.limit.toString())

    return apiClient.get<SearchHelpersResponse>(`/helpers/search?${queryParams.toString()}`)
  },

  getHelperById: async (id: string) => {
    return apiClient.get<Helper>(`/helpers/${id}`)
  },

  getMyHelperProfile: async () => {
    return apiClient.get<Helper>('/helpers/profile/me')
  },

  updateHelper: async (data: Partial<Helper>) => {
    return apiClient.put<Helper>('/helpers/profile/me', data)
  },

  uploadKYCDocuments: async (documents: string[]) => {
    return apiClient.post<Helper>('/helpers/kyc/upload', { documents })
  },

  updatePortfolio: async (portfolio: string[]) => {
    return apiClient.put<Helper>('/helpers/portfolio', { portfolio })
  },

  getHelperTasks: async () => {
    return apiClient.get<Task[]>('/helpers/tasks/my')
  },

  getHelperEarnings: async () => {
    return apiClient.get<HelperEarningsResponse>('/helpers/earnings/my')
  },
}

