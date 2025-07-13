import { cookies } from 'next/headers'
import appConfig from '@/config/app.config'
import { AppLanguages } from '@/types/app.types'
import { LOCALE_COOKIE_NAME } from '@/constants'

/**
 * Returns the current locale (language code) to be used server-side from the next-intl cookie if
 * available. Falls back to the app default language.
 *
 * @returns {Promise<AppLanguages>} The current language code (e.g., 'en', 'ar').
 */
export const getCurrentLocale = async (): Promise<AppLanguages> => {
  const cookieStore = await cookies()

  const currentLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value ?? appConfig.defaultLanguage
  return currentLocale as AppLanguages
}
