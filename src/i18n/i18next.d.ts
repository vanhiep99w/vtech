import 'i18next'
import enAuth from './locales/en/auth.json'
import enCommon from './locales/en/common.json'
import enProduct from './locales/en/product.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      auth: typeof enAuth
      common: typeof enCommon
      product: typeof enProduct
    }
  }
}
