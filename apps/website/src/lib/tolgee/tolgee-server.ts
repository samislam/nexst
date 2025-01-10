import { cache } from 'react'
import { getLocale } from 'next-intl/server'
import { TolgeeBase, ALL_LOCALES, getStaticData } from './tolgee-shared'
import appConfig from '@/config/app.config'

// wrapping in `cache` function will ensure
// that we are sharing the instance within a single request
export const getTolgeeInstance = cache(async (locale: string) => {
  const tolgee = TolgeeBase().init({
    // include all static data on the server, as the bundle size is not a concern here
    staticData: await getStaticData(ALL_LOCALES),
    observerOptions: {
      // include full information about the key into the watermark
      // make sure you have newest SDK for this feature
      fullKeyEncode: true,
    },
    // locale is already detected by next-intl package
    language: locale,
    defaultLanguage: appConfig.defaultLanguage,
    // providing custom fetch function, which will disable default caching
    fetch: async (input, init) => {
      return fetch(input, { ...init, next: { revalidate: 0 } })
    },
  })

  await tolgee.run()

  return tolgee
})

export const getTolgee = async () => {
  const locale = await getLocale()
  const tolgee = await getTolgeeInstance(locale)
  return tolgee
}

export const getTranslate = async () => {
  const tolgee = await getTolgee()
  return tolgee.t
}
