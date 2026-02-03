export interface CategoryResponse {
  id: string
  categoryName: string
  slug: string
  categoryDesc?: string | null
  thumbnailUrl?: string | null
  parentId?: string | null
  parentName?: string | null
  displayOrder: number
  status: number
  createdAt: string
  updatedAt: string
}

export interface CreateCategoryPayload {
  categoryName: string
  slug: string
  categoryDesc?: string
  thumbnailUrl?: string
  parentId?: string | null
  displayOrder?: number
}

export interface UpdateCategoryPayload {
  categoryName: string
  slug: string
  categoryDesc?: string
  thumbnailUrl?: string
  parentId?: string | null
  displayOrder?: number
  status: number
}
