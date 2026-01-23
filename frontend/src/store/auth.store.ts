import { create } from 'zustand'
import { loginApi, registerApi, logoutApi, getMyInfoApi } from '@/services/auth/auth.api'
import type { LoginRequest, SignUpRequest, User } from '@/services/auth/auth.type'
import { setToken, clearToken, getToken } from '@/utils/authStorage'
import { toast } from 'sonner'
import axios from 'axios'

interface AuthState {
  user: User | null
  token: string | null
  roles: string[]
  isAuthenticated: boolean
  loading: boolean

  login: (data: LoginRequest) => Promise<void>
  register: (data: SignUpRequest) => Promise<void>
  fetchMyInfo: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: getToken(),
  roles: [],
  isAuthenticated: !!getToken(),
  loading: false,

  login: async (data) => {
    set({ loading: true })
    try {
      const res = await loginApi(data)

      if (!res.authenticated) {
        throw new Error('Xác thực không thành công')
      }

      setToken(res.token)

      set({
        token: res.token,
        roles: res.roles,
        isAuthenticated: true
      })

      await useAuthStore.getState().fetchMyInfo()
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message
        throw new Error(message)
      }
      throw error
    } finally {
      set({ loading: false })
    }
  },

  register: async (data) => {
    set({ loading: true })
    try {
      await registerApi(data)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message
        throw new Error(message)
      }
      throw error
    } finally {
      set({ loading: false })
    }
  },

  fetchMyInfo: async () => {
    const user = await getMyInfoApi()
    set({ user })
  },

  logout: async () => {
    const token = getToken()
    if (token) {
      try {
        await logoutApi(token)
      } catch {
        toast.error('Lỗi khi đăng xuất')
      }
    }

    clearToken()
    set({
      user: null,
      token: null,
      roles: [],
      isAuthenticated: false
    })
  }
}))
