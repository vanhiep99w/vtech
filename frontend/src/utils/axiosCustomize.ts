import i18n from '@/i18n/i18n'
import { refreshTokenApi } from '@/services/auth/auth.api'
import { clearToken, getToken, setToken } from '@/utils/authStorage'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080/api/v2',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = getToken()

  const publicEndpoints = ['/login', '/users/register', '/refresh']
  const isPublic = publicEndpoints.some((url) => config.url?.includes(url))

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`
  }

  config.headers['Accept-Language'] = i18n.resolvedLanguage

  return config
})

let isRefreshing = false
type FailedRequest = {
  resolve: (token: string | null) => void
  reject: (error: unknown) => void
}
let failedQueue: FailedRequest[] = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Lỗi mạng hoặc server không phản hồi
    if (!error.response) {
      return Promise.reject(error)
    }

    const status = error.response.status

    const publicEndpoints = ['/login', '/users/register', '/refresh']
    const isPublic = publicEndpoints.some((url) => originalRequest.url?.includes(url))

    if (status === 401 && isPublic) {
      return Promise.reject(error)
    }

    // Hết hạn refresh token
    if (originalRequest.url?.includes('/refresh')) {
      clearToken()
      return Promise.reject(error)
    }

    // Token hết hạn
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        })
      }

      isRefreshing = true
      // Refresh token
      try {
        const oldToken = getToken()
        if (!oldToken) throw new Error('No token')

        const res = await refreshTokenApi(oldToken)

        setToken(res.token)
        api.defaults.headers.Authorization = `Bearer ${res.token}`

        processQueue(null, res.token)

        originalRequest.headers.Authorization = `Bearer ${res.token}`
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        clearToken()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)
