export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Tiếng Việt' }
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']
