import { concat } from 'concat-str'
import { createAppConfig } from '@/types/app-config'
import logo from '@/media/logo.png'

export default createAppConfig({
  languages: ['en', 'ar', 'tr'],
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
  defaultTheme: 'light',
  appName: 'Nexst website template',
  appLogo: logo,
  appDescription: concat('@Nexst template website'),
})
