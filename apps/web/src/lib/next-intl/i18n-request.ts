import appConfig from '@/config/app.config'
import { AppLanguages } from '@/types/app.types'
import { getRequestConfig } from 'next-intl/server'
import type { AbstractIntlMessages } from 'next-intl'
import { getStaticData } from '../tolgee/tolgee-shared'

/** This function is indirectly getting called by the next.config.ts file */
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !isAppLanguage(locale)) locale = appConfig.defaultLanguage
  const safeLocale = locale as AppLanguages
  const messages = (await getStaticData([safeLocale]))[safeLocale] as AbstractIntlMessages

  const appFormattersDef = await appConfig.i18nFormattersDefaults?.(requestLocale)

  return {
    messages,
    locale: safeLocale,
    ...appFormattersDef,
  }
})

const isAppLanguage = (lang: string) => appConfig.languages.includes(lang as AppLanguages)
