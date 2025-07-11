import appConfig from '@/config/app.config'
import { StaticImageData } from 'next/image'
import { AppLocaleRoutingDef } from './_misc'
import { RequestConfig } from 'next-intl/server'

type NextIntlRequestConfig = Pick<RequestConfig, 'formats' | 'timeZone' | 'now'>

export interface AppConfig<L extends string> {
  appName: string
  appDescription: string
  defaultTheme: AppThemes
  defaultLanguage: NoInfer<L>
  fallbackLanguage: NoInfer<L>
  readonly languages: Array<L>
  appLogo: string | StaticImageData
  i18nRoutingDef?: AppLocaleRoutingDef<L>
  i18nFormattersDefaults?: (
    requestLocale: Promise<string | undefined>
  ) => NextIntlRequestConfig | Promise<NextIntlRequestConfig>
}

export type AppLanguages = (typeof appConfig.languages)[number]
export type AppThemes = 'light' | 'dark'
