import appConfig from '@/config/app.config'
import { getStaticData } from './tolgee-shared'
import { AppLanguages } from '@/types/app.types'
import { getRequestConfig } from 'next-intl/server'
import type { AbstractIntlMessages } from 'next-intl'

function isAppLanguage(lang: string): lang is AppLanguages {
  return appConfig.languages.includes(lang as AppLanguages)
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !isAppLanguage(locale)) locale = appConfig.defaultLanguage
  const safeLocale = locale as AppLanguages
  const messages = (await getStaticData([safeLocale]))[safeLocale] as AbstractIntlMessages

  return {
    locale: safeLocale,
    messages,
  }
})
