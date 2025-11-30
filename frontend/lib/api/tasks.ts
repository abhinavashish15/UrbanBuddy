import { apiClient } from '../api'
import type { Task } from '@/types'

export interface CreateTaskData {
  title: string
  description: string
  serviceType: string
  address: string
  city: string
  latitude?: number
  longitude?: number
  budget: number
  scheduledAt?: string
  images?: string[]
}

export interface SearchTasksParams {
  city?: string
  serviceType?: string
  status?: string
  minBudget?: number
  maxBudget?: number
  page?: number
  limit?: number
}

export interface SearchTasksResponse {
  tasks: Task[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export const tasksApi = {
  searchTasks: async (params: SearchTasksParams) => {
    const queryParams = new URLSearchParams()
    if (params.city) queryParams.append('city', params.city)
    if (params.serviceType) queryParams.append('serviceType', params.serviceType)
    if (params.status) queryParams.append('status', params.status)
    if (params.minBudget) queryParams.append('minBudget', params.minBudget.toString())
    if (params.maxBudget) queryParams.append('maxBudget', params.maxBudget.toString())
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.limit) queryParams.append('limit', params.limit.toString())

    return apiClient.get<SearchTasksResponse>(`/tasks/search?${queryParams.toString()}`)
  },

  getTaskById: async (id: string) => {
    return apiClient.get<Task>(`/tasks/${id}`)
  },

  createTask: async (data: CreateTaskData) => {
    return apiClient.post<Task>('/tasks', data)
  },

  updateTask: async (id: string, data: Partial<CreateTaskData>) => {
    return apiClient.put<Task>(`/tasks/${id}`, data)
  },

  acceptTask: async (id: string) => {
    return apiClient.post<Task>(`/tasks/${id}/accept`)
  },

  updateTaskStatus: async (id: string, status: Task['status']) => {
    return apiClient.patch<Task>(`/tasks/${id}/status`, { status })
  },
}

