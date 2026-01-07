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
import i18n from '@/i18n/i18n'

const logInSchema = z.object({
  email: z.string().min(1, i18n.t('errors.email.required')).email(i18n.t('errors.email.invalid')),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, i18n.t('errors.password.min'))
    .refine((val) => PASSWORD_UPPERCASE_REGEX.test(val), {
      message: i18n.t('errors.password.uppercase')
    })
    .refine((val) => PASSWORD_LOWERCASE_REGEX.test(val), {
      message: i18n.t('errors.password.lowercase')
    })
    .refine((val) => PASSWORD_NUMBER_REGEX.test(val), {
      message: i18n.t('errors.password.number')
    })
    .refine((val) => PASSWORD_SPECIAL_REGEX.test(val), {
      message: i18n.t('errors.password.special')
    })
})

const signUpSchema = z.object({
  lastname: z.string().min(NAME_MIN_LENGTH, i18n.t('errors.lastname.required')),
  firstname: z.string().min(NAME_MIN_LENGTH, i18n.t('errors.firstname.required')),
  username: z.string().min(USERNAME_MIN_LENGTH, i18n.t('errors.username.min')),
  email: z
    .string()
    .min(NAME_MIN_LENGTH, i18n.t('errors.email.required'))
    .email(i18n.t('errors.email.invalid')),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, i18n.t('errors.password.min'))
    .refine((val) => PASSWORD_UPPERCASE_REGEX.test(val), {
      message: i18n.t('errors.password.uppercase')
    })
    .refine((val) => PASSWORD_LOWERCASE_REGEX.test(val), {
      message: i18n.t('errors.password.lowercase')
    })
    .refine((val) => PASSWORD_NUMBER_REGEX.test(val), {
      message: i18n.t('errors.password.number')
    })
    .refine((val) => PASSWORD_SPECIAL_REGEX.test(val), {
      message: i18n.t('errors.password.special')
    })
})

export { logInSchema, signUpSchema }
