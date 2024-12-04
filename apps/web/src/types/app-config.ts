import appConfig from '@/config/app.config'
import { StaticImageData } from 'next/image'

interface AppConfig<L extends string> {
  appName: string
  appLogo: string | StaticImageData
  appDescription: string
  defaultLanguage: NoInfer<L>
  defaultTheme: 'light' | 'dark'
  fallbackLanguage: NoInfer<L>
  readonly languages: Array<L>
}
export const createAppConfig = <L extends string>(ac: AppConfig<L>) => ac

export type AppLanguages = (typeof appConfig.languages)[number]
