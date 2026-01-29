export interface UserResponse {
  id: string
  username: string
  email: string
  fullName?: string | null
  phone?: string | null
  avatar?: string | null
  status: number
  roles: string[]
  createdAt: string
  updatedAt: string
}

export type UpdateUserRequest = {
  username: string
  fullName?: string | null
  phone?: string | null
  avatar?: string | null
  status: number
  roles?: string[]
}

export type UpdateUserResponse = {
  id: string
  username: string
  email: string
  fullName?: string | null
  phone?: string | null
  avatar?: string | null
  status: number
}
