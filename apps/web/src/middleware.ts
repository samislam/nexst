import appConfig from './config/app.config'
import { defineRouting } from 'next-intl/routing'
import createMiddleware from 'next-intl/middleware'
import { middlewareStack } from 'nextjs-middleware-stack'

export default middlewareStack([
  [
    '*',
    createMiddleware(
      defineRouting({
        locales: appConfig.languages,
        defaultLocale: appConfig.defaultLanguage,
        ...appConfig.localeRoutingDef,
      })
    ),
  ],
])

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
