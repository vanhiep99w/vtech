export interface ApiResponse<T> {
  data: T
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  authenticated: boolean
  roles: string[]
}

export interface SignUpRequest {
  username: string
  email: string
  password: string
}

export interface User {
  id: string
  username: string
  email: string
  fullName?: string
  phone?: string
  avatar?: string
  status?: number
}
