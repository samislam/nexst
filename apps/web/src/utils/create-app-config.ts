import ms from 'ms'
import { AppConfig } from '@/types/app.types'
import { LOCALE_COOKIE_NAME } from '@/constants'

export const createAppConfig = <L extends string>(ac: AppConfig<L>) => ({
  ...ac,
  i18nRoutingDef: Object.assign(ac.i18nRoutingDef ?? {}, {
    localePrefix: 'never', // defaults to have no URL prefix (no /en/users, just /users)
    localeCookie: {
      name: LOCALE_COOKIE_NAME,
      secure: false,
      sameSite: 'lax',
      maxAge: ms('1y'),
    },
  }),
})
