// schemas.ts
import { z } from 'zod'
import {
  NAME_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_LOWERCASE_REGEX,
  PASSWORD_UPPERCASE_REGEX,
  PASSWORD_NUMBER_REGEX,
  PASSWORD_SPECIAL_REGEX
} from '@/defines/auth-constants'
import type { TFunction } from 'i18next'

// Tạo hàm trả về schema động
export const createLogInSchema = (t: TFunction<'auth'>) =>
  z.object({
    email: z.string().min(1, t('errors.email.required')).email(t('errors.email.invalid')),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, t('errors.password.min'))
      .refine((val) => PASSWORD_UPPERCASE_REGEX.test(val), {
        message: t('errors.password.uppercase')
      })
      .refine((val) => PASSWORD_LOWERCASE_REGEX.test(val), {
        message: t('errors.password.lowercase')
      })
      .refine((val) => PASSWORD_NUMBER_REGEX.test(val), {
        message: t('errors.password.number')
      })
      .refine((val) => PASSWORD_SPECIAL_REGEX.test(val), {
        message: t('errors.password.special')
      })
  })

export const createSignUpSchema = (t: TFunction<'auth'>) =>
  z.object({
    lastname: z.string().min(NAME_MIN_LENGTH, t('errors.lastname.required')),
    firstname: z.string().min(NAME_MIN_LENGTH, t('errors.firstname.required')),
    username: z.string().min(USERNAME_MIN_LENGTH, t('errors.username.min')),
    email: z
      .string()
      .min(NAME_MIN_LENGTH, t('errors.email.required'))
      .email(t('errors.email.invalid')),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, t('errors.password.min'))
      .refine((val) => PASSWORD_UPPERCASE_REGEX.test(val), {
        message: t('errors.password.uppercase')
      })
      .refine((val) => PASSWORD_LOWERCASE_REGEX.test(val), {
        message: t('errors.password.lowercase')
      })
      .refine((val) => PASSWORD_NUMBER_REGEX.test(val), {
        message: t('errors.password.number')
      })
      .refine((val) => PASSWORD_SPECIAL_REGEX.test(val), {
        message: t('errors.password.special')
      })
  })
