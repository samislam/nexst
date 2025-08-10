import appConfig from '@/config/app.config'
import { LOCALE_COOKIE } from '@/constants'
import { defineRouting } from 'next-intl/routing'
import { CookieAttributes } from '@repo/react-utils'

let localeCookieConfig: CookieAttributes = { name: LOCALE_COOKIE }
if (typeof appConfig.i18nRoutingDef?.localeCookie === 'object') {
  localeCookieConfig = {
    ...localeCookieConfig,
    ...appConfig.i18nRoutingDef.localeCookie,
  }
}

export const appRoutingDef = defineRouting({
  locales: appConfig.languages,
  defaultLocale: appConfig.defaultLanguage,
  ...appConfig.i18nRoutingDef,
  localeCookie: localeCookieConfig,
})
