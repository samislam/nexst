import { cookies } from 'next/headers'
import appConfig from '@/config/app.config'
import { AppLanguages } from '@/types/app.types'

/**
 * Returns the current locale (language code) to be used server-side from the `locale` cookie if
 * available. Falls back to the app default language.
 *
 * @returns {Promise<AppLanguages>} The current language code (e.g., 'en', 'ar').
 */
export const getCurrentLocale = async (): Promise<AppLanguages> => {
  const cookieStore = await cookies()

  const currentLocale = cookieStore.get(COOKIE_NAME)?.value ?? appConfig.defaultLanguage
  return currentLocale as AppLanguages
}

/**
 * This value is the default value that next-intl package uses. **You shouldn't change this value**.
 * if your app requires a different name, change in your
 * appConfig.localeRoutingDef.localeCookie.name
 */
const DEFAULT_COOKIE_NAME = 'NEXT_LOCALE'

const COOKIE_NAME =
  typeof appConfig.localeRoutingDef?.localeCookie === 'object' &&
  appConfig.localeRoutingDef.localeCookie.name
    ? appConfig.localeRoutingDef.localeCookie.name
    : DEFAULT_COOKIE_NAME
