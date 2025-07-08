import { concat } from 'concat-str'
import logo from '@/media/logo.png'
import { createAppConfig } from '@/types/app.types'

export default createAppConfig({
  appLogo: logo,
  defaultTheme: 'light',
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
  languages: ['en', 'ar', 'tr'],
  appName: 'Nexst website template',
  appDescription: concat('@Nexst template website'),
})
