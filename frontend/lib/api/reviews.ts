import { apiClient } from '../api'
import type { Review } from '@/types'

export interface CreateReviewData {
  rating: number
  comment: string
}

export const reviewsApi = {
  createReview: async (taskId: string, data: CreateReviewData) => {
    return apiClient.post<Review>(`/reviews/task/${taskId}`, data)
  },

  getReviewsByHelper: async (helperId: string) => {
    return apiClient.get<Review[]>(`/reviews/helper/${helperId}`)
  },

  getReviewsByTask: async (taskId: string) => {
    return apiClient.get<Review[]>(`/reviews/task/${taskId}`)
  },
}

