import { api } from '@/utils/axiosCustomize'
import type { ApiResponse, LoginRequest, LoginResponse, SignUpRequest, User } from './auth.type'

export const loginApi = async (data: LoginRequest) => {
  const res = await api.post<ApiResponse<LoginResponse>>('/login', data)
  return res.data.data
}

export const registerApi = async (data: SignUpRequest) => {
  const res = await api.post<ApiResponse<User>>('/users/register', data)
  return res.data.data
}

export const logoutApi = async (token: string) => {
  await api.post('/logout', { token })
}

export const getMyInfoApi = async () => {
  const res = await api.get<User>('/users/my-info')
  return res.data
}

export const refreshTokenApi = async (token: string) => {
  const res = await api.post<ApiResponse<LoginResponse>>('/refresh', {
    token
  })
  return res.data.data
}
