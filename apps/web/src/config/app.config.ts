import { concat } from 'concat-str'
import logo from '@/media/logo.png'
import { createAppConfig } from '@/types/app-config'

export default createAppConfig({
  appLogo: logo,
  defaultTheme: 'light',
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
  appName: 'Nexst starter',
  languages: ['en', 'ar', 'tr'],
  appDescription: concat('@Nexst template website'),
})
