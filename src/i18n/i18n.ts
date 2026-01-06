import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enAuth from './locales/en/auth.json'
import viAuth from './locales/vi/auth.json'
import enCommon from './locales/en/common.json'
import viCommon from './locales/vi/common.json'

export const locales = {
  vi: 'Tiếng Việt',
  en: 'English'
}

export const resources = {
  en: {
    auth: enAuth,
    common: enCommon
  },
  vi: {
    auth: viAuth,
    common: viCommon
  }
}

export const defaultNS = 'auth'

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['auth', 'common'],
  defaultNS,
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false
  }
})
