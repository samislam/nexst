import appConfig from '@/config/app.config'
import { FormatIcu } from '@tolgee/format-icu'
import { clientEnv } from '@/server/client-env'
import { AppLanguages } from '@/types/app.types'
import { DevTools, Tolgee, TreeTranslationsData } from '@tolgee/react'

const apiKey = clientEnv.NEXT_PUBLIC_TOLGEE_API_KEY
const apiUrl = clientEnv.NEXT_PUBLIC_TOLGEE_API_URL

export async function getStaticData(languages: AppLanguages[]) {
  const result: Record<string, TreeTranslationsData | (() => Promise<TreeTranslationsData>)> = {}
  for (const lang of languages) {
    result[lang] = (await import(`../../i18n/${lang}.json`)).default
  }
  return result
}

export function TolgeeBase() {
  return Tolgee().use(FormatIcu()).use(DevTools()).updateDefaults({
    apiKey,
    apiUrl,
    defaultLanguage: appConfig.defaultLanguage,
    fallbackLanguage: appConfig.fallbackLanguage,
  })
}
