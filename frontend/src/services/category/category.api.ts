import type { ApiResponse } from '@/services/auth/auth.type'
import type {
  CategoryResponse,
  CreateCategoryPayload,
  UpdateCategoryPayload
} from '@/services/category/category.type'
import { api } from '@/utils/axiosCustomize'

export const getAllCategoryApi = async () => {
  const res = await api.get<ApiResponse<CategoryResponse[]>>('/categories')
  return res.data.data
}

// TODO: gọi api create
export const createCategoryApi = async (payload: CreateCategoryPayload) => {
  const res = await api.post<ApiResponse<CategoryResponse>>('/categories', payload)
  return res.data.data
}

// TODO: gọi api edit
export const updateCategoryApi = async (categoryId: string, payload: UpdateCategoryPayload) => {
  const res = await api.put<ApiResponse<CategoryResponse>>(`/categories/${categoryId}`, payload)
  return res.data.data
}

// TODO: gọi api delete
export const deleteCategoryApi = async (categoryId: string) => {
  const res = await api.delete<ApiResponse<void>>(`/categories/${categoryId}`)
  return res.data
}
