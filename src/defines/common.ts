export const Themes = {
  DARK: 'dark',
  LIGHT: 'light'
} as const
export type Themes = (typeof Themes)[keyof typeof Themes]
