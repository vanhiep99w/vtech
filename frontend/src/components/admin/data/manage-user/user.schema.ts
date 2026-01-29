import { z } from 'zod'
import i18n from '@/i18n/i18n'

export const createUserSchema = z.object({
  username: z.string().min(3, i18n.t('auth:errors.username.min')),
  email: z
    .string()
    .min(1, i18n.t('auth:errors.email.required'))
    .email(i18n.t('auth:errors.email.invalid')),
  fullName: z.string().min(3, i18n.t('auth:errors.fullName.min')),
  phone: z.string().min(8, i18n.t('auth:errors.phone.min')),
  password: z.string().min(6, i18n.t('auth:errors.password.min')),
  role: z.enum(['ADMIN', 'USER', 'STAFF']),
  status: z.enum(['ACTIVE', 'INACTIVE'])
})

export const editUserSchema = z.object({
  username: z.string().min(3, i18n.t('auth:errors.username.min')),
  fullName: z.string().optional().nullable(),
  phone: z.string().min(8, i18n.t('auth:errors.phone.min')),
  avatar: z.string().url().optional().nullable(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  roles: z
    .array(z.enum(['ADMIN', 'USER', 'STAFF']))
    .length(1, i18n.t('user:message.error.roleRequired'))
})

export type CreateUserFormValues = z.infer<typeof createUserSchema>
export type EditUserFormValues = z.infer<typeof editUserSchema>
