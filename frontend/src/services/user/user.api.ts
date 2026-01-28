import { api } from '@/utils/axiosCustomize'
import type { ApiResponse } from '@/services/auth/auth.type'
import type { UpdateUserRequest, UpdateUserResponse, UserResponse } from '@/services/user/user.type'

export const getAllUsersApi = async () => {
  const res = await api.get<ApiResponse<UserResponse[]>>('/users/getall')
  return res.data.data
}

// TODO: api create, edit, delete

export const updateUserApi = async (userId: string, payload: UpdateUserRequest) => {
  const res = await api.put<ApiResponse<UpdateUserResponse>>(`/users/${userId}`, payload)
  return res.data.data
}
