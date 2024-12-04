import { cookies } from 'next/headers'
import appConfig from '@/config/app.config'
import { AppLanguages } from '@/types/app-config'
import { createServerInstance } from '@tolgee/react/server'
import { TolgeeBase, ALL_LOCALES, getStaticData } from './tolgee-shared'

export const { getTolgee, getTranslate, T } = createServerInstance({
  getLocale: async () => {
    // you can write your own logic here to get the user specific locale
    const cookieStore = await cookies()
    const locale = cookieStore.get('locale')?.value as AppLanguages
    return locale
  },
  createTolgee: async (locale) =>
    TolgeeBase().init({
      staticData: await getStaticData(ALL_LOCALES),
      observerOptions: {
        fullKeyEncode: true,
      },
      language: locale,
      defaultLanguage: appConfig.defaultLanguage,
      fetch: async (input, init) => {
        const data = await fetch(input, { ...init, next: { revalidate: 0 } })
        return data
      },
    }),
})
