import { z } from 'zod'

export const createCategorySchema = z.object({
  categoryName: z.string().min(1, 'Tên danh mục không được để trống'),
  slug: z.string().min(1, 'Slug không được để trống'),
  categoryDesc: z.string().optional(),
  thumbnailUrl: z.string().url('Thumbnail không hợp lệ').optional().or(z.literal('')),
  parentId: z.string().optional().nullable(),
  displayOrder: z.number().int().min(0).optional()
})

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>
