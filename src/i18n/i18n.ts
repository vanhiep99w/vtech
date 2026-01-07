import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import enAuth from './locales/en/auth.json'
import viAuth from './locales/vi/auth.json'
import enCommon from './locales/en/common.json'
import viCommon from './locales/vi/common.json'

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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    ns: ['auth', 'common'],
    defaultNS,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'LANGUAGE'
    },
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    }
  })
