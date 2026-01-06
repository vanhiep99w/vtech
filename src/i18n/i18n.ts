import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enAuth from './locales/en/auth.json'
import viAuth from './locales/vi/auth.json'

export const locales = {
  vi: 'Tiếng Việt',
  en: 'English'
}

export const resources = {
  en: {
    auth: enAuth
  },
  vi: {
    auth: viAuth
  }
}

export const defaultNS = 'auth'

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['auth'],
  defaultNS,
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false
  }
})
