import type { TFunction } from 'i18next'
import { z } from 'zod'
import { AUTH_RULES, PASSWORD_REGEX } from '@/defines/auth-constants'

export const createSignUpSchema = (t: TFunction<'auth'>) => {
  return z.object({
    lastname: z.string().min(AUTH_RULES.NAME_MIN_LENGTH, t('auth.errors.lastname.required')),
    firstname: z.string().min(AUTH_RULES.NAME_MIN_LENGTH, t('auth.errors.firstname.required')),
    username: z.string().min(AUTH_RULES.USERNAME_MIN_LENGTH, t('auth.errors.username.min')),
    email: z
      .string()
      .min(AUTH_RULES.NAME_MIN_LENGTH, t('auth.errors.email.required'))
      .email(t('auth.errors.email.invalid')),
    password: z
      .string()
      .min(AUTH_RULES.PASSWORD_MIN_LENGTH, t('auth.errors.password.min'))
      .refine((val) => PASSWORD_REGEX.UPPERCASE.test(val), {
        message: t('auth.errors.password.uppercase')
      })
      .refine((val) => PASSWORD_REGEX.LOWERCASE.test(val), {
        message: t('auth.errors.password.lowercase')
      })
      .refine((val) => PASSWORD_REGEX.NUMBER.test(val), {
        message: t('auth.errors.password.number')
      })
      .refine((val) => PASSWORD_REGEX.SPECIAL.test(val), {
        message: t('auth.errors.password.special')
      })
  })
}

export const createLoginSchema = (t: TFunction<'auth'>) => {
  return z.object({
    email: z.string().min(1, t('auth.errors.email.required')).email(t('auth.errors.email.invalid')),
    password: z
      .string()
      .min(AUTH_RULES.PASSWORD_MIN_LENGTH, t('auth.errors.password.min'))
      .refine((val) => PASSWORD_REGEX.UPPERCASE.test(val), {
        message: t('auth.errors.password.uppercase')
      })
      .refine((val) => PASSWORD_REGEX.LOWERCASE.test(val), {
        message: t('auth.errors.password.lowercase')
      })
      .refine((val) => PASSWORD_REGEX.NUMBER.test(val), {
        message: t('auth.errors.password.number')
      })
      .refine((val) => PASSWORD_REGEX.SPECIAL.test(val), {
        message: t('auth.errors.password.special')
      })
  })
}

export type SignUpFormData = z.infer<ReturnType<typeof createSignUpSchema>>
export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>
