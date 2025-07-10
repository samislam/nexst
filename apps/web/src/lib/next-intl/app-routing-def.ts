import appConfig from '@/config/app.config'
import { defineRouting } from 'next-intl/routing'

export const appRoutingDef = defineRouting({
  locales: appConfig.languages,
  defaultLocale: appConfig.defaultLanguage,
  ...appConfig.localeRoutingDef,
})
