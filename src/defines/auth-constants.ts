export const AUTH_RULES = {
  NAME_MIN_LENGTH: 1,
  USERNAME_MIN_LENGTH: 3,
  PASSWORD_MIN_LENGTH: 6
} as const

export const PASSWORD_REGEX = {
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  NUMBER: /\d/,
  SPECIAL: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
} as const
