import type { ApiResponse } from '@/services/auth/auth.type'
import type { BrandPayload, BrandReponse } from '@/services/brand/brand.type'
import { api } from '@/utils/axiosCustomize'

export const getAllBrandApi = async () => {
  const res = await api.get<ApiResponse<BrandReponse[]>>('/brands')
  return res.data.data
}

// TODO: api create
export const createBrandApi = async (payload: BrandPayload) => {
  const formData = new FormData()

  formData.append('brandName', payload.brandName)
  formData.append('slug', payload.slug)

  if (payload.brandDesc) {
    formData.append('brandDesc', payload.brandDesc)
  }

  if (payload.displayOrder !== undefined) {
    formData.append('displayOrder', payload.displayOrder.toString())
  }

  if (payload.brandLogo) {
    formData.append('brandLogo', payload.brandLogo)
  }

  const res = await api.post<ApiResponse<BrandReponse>>('/brands', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return res.data.data
}

// TODO: api update
export const updateBrandApi = async (brandId: string, payload: BrandPayload) => {
  const formData = new FormData()

  formData.append('brandName', payload.brandName)
  formData.append('slug', payload.slug)

  if (payload.brandDesc) formData.append('brandDesc', payload.brandDesc)

  if (payload.displayOrder !== undefined)
    formData.append('displayOrder', String(payload.displayOrder))

  if (payload.brandLogo) formData.append('brandLogo', payload.brandLogo)

  const res = await api.put<ApiResponse<BrandReponse>>(`/brands/${brandId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  return res.data.data
}

// TODO: api delete soft
export const deleteSoftBrandApi = async (brandId: string) => {
  const res = await api.delete<ApiResponse<void>>(`/brands/${brandId}`)
  return res.data
}

// TODO: api get all in trash
export const getAllInTrash = async () => {
  const res = await api.get<ApiResponse<BrandReponse>>('/brands/trash')
  return res.data.data
}

// TODO: api restore
// TODO: api delete hash
