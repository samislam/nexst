import { concat } from 'concat-str'
import logo from '@/media/logo.png'
import { createAppConfig } from '@/utils/create-app-config'

export default createAppConfig({
  appLogo: logo,
  defaultTheme: 'light',
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
  languages: ['en', 'ar', 'tr'],
  appName: 'Nexst website template',
  appDescription: concat('@Nexst web template'),
  i18nRoutingDef: {
    localePrefix: {
      mode: 'never',
    },
  },
})
