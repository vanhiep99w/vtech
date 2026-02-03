import i18n from '@/i18n/i18n'
import { z } from 'zod'

export const createCategorySchema = z.object({
  categoryName: z.string().min(1, i18n.t('category:schema.categoryName.required')),
  slug: z.string().min(1, i18n.t('category:schema.slug.required')),
  categoryDesc: z.string().optional(),
  thumbnailUrl: z
    .string()
    .url(i18n.t('category:schema.thumbnailUrl.invalid'))
    .optional()
    .or(z.literal('')),
  parentId: z.string().optional().nullable(),
  displayOrder: z
    .number()
    .int(i18n.t('category:schema.displayOrder.invalid'))
    .min(0, i18n.t('category:schema.displayOrder.min'))
})

export const editCategorySchema = z.object({
  categoryName: z.string().min(1, i18n.t('category:schema.categoryName.required')),
  slug: z.string().min(1, i18n.t('category:schema.slug.required')),
  categoryDesc: z.string().optional(),
  thumbnailUrl: z
    .string()
    .url(i18n.t('category:schema.thumbnailUrl.invalid'))
    .optional()
    .or(z.literal('')),
  parentId: z.string().optional().nullable(),
  displayOrder: z
    .number()
    .int(i18n.t('category:schema.displayOrder.invalid'))
    .min(0, i18n.t('category:schema.displayOrder.min')),
  status: z.number().int(i18n.t('category:schema.status.invalid'))
})

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>
export type EditCategoryFormValues = z.infer<typeof editCategorySchema>
