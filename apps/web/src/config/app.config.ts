import logo from '@/media/logo.png'
import { createAppConfig } from '@/types/app-config'

export default createAppConfig({
  appName: 'Nexst starter',
  appLogo: logo,
  appDescription: 'Starter template for Nest & Nextjs project',
  languages: ['en', 'ar', 'tr'],
  defaultLanguage: 'en',
  defaultTheme: 'light',
  fallbackLanguage: 'en',
})
