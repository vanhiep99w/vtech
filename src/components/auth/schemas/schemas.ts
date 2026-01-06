import type { TFunction } from 'i18next'
import { z } from 'zod'

export const createSignUpSchema = (t: TFunction<'auth'>) => {
  return z.object({
    lastname: z.string().min(1, t('auth.errors.lastname.required')),
    firstname: z.string().min(1, t('auth.errors.firstname.required')),
    username: z.string().min(3, t('auth.errors.username.min')),
    email: z.string().min(1, t('auth.errors.email.required')).email(t('auth.errors.email.invalid')),
    password: z
      .string()
      .min(6, t('auth.errors.password.min'))
      .refine((val) => /[A-Z]/.test(val), {
        message: t('auth.errors.password.uppercase')
      })
      .refine((val) => /[a-z]/.test(val), {
        message: t('auth.errors.password.lowercase')
      })
      .refine((val) => /\d/.test(val), {
        message: t('auth.errors.password.number')
      })
      .refine((val) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val), {
        message: t('auth.errors.password.special')
      })
  })
}

export const createLoginSchema = (t: TFunction<'auth'>) => {
  return z.object({
    email: z.string().min(1, t('auth.errors.email.required')).email(t('auth.errors.email.invalid')),
    password: z
      .string()
      .min(6, t('auth.errors.password.min'))
      .refine((val) => /[A-Z]/.test(val), {
        message: t('auth.errors.password.uppercase')
      })
      .refine((val) => /[a-z]/.test(val), {
        message: t('auth.errors.password.lowercase')
      })
      .refine((val) => /\d/.test(val), {
        message: t('auth.errors.password.number')
      })
      .refine((val) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val), {
        message: t('auth.errors.password.special')
      })
  })
}

// Type inference helper
export type SignUpFormData = z.infer<ReturnType<typeof createSignUpSchema>>
export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>
