import appConfig from '@/config/app.config'
import { StaticImageData } from 'next/image'
import { LocalePrefixMode, RoutingConfig } from 'next-intl/routing'
// import { DomainsConfig, Pathnames } from 'next-intl/routing'

type NextIntlRoutingDef<L extends string> = Omit<
  RoutingConfig<
    readonly L[],
    LocalePrefixMode,
    never, // Pathnames<readonly L[]>,
    never // DomainsConfig<readonly L[]>
  >,
  'locales' | 'defaultLocale'
>

interface AppConfig<L extends string> {
  appName: string
  appLogo: string | StaticImageData
  appDescription: string
  defaultTheme: AppThemes
  defaultLanguage: NoInfer<L>
  fallbackLanguage: NoInfer<L>
  readonly languages: Array<L>
  localeRoutingDef?: NextIntlRoutingDef<L>
}

export type AppLanguages = (typeof appConfig.languages)[number]
export type AppThemes = 'light' | 'dark'

export const createAppConfig = <L extends string>(ac: AppConfig<L>): AppConfig<L> => ({
  ...ac,
  localeRoutingDef: Object.assign(ac.localeRoutingDef ?? {}, {
    localePrefix: 'never', // defaults to have no URL prefix (no /en/users, just /users)
  } satisfies NextIntlRoutingDef<AppLanguages>),
})
