import createMiddleware from 'next-intl/middleware'
import { middlewareStack } from 'nextjs-middleware-stack'
import { appRoutingDef } from './lib/next-intl/app-routing-def'

const regExp = {
  i18nExclude: /^(?!.*\/(api|_next\/static|_next\/image|favicon\.ico)).*$/,
}

export default middlewareStack([
  // ... your other middlewares
  [regExp.i18nExclude, createMiddleware(appRoutingDef)],
])

export const config = {
  matcher: [
    '/(api|trpc)(.*)', // Always run for API routes,
    '/((?!_next|.*\\..*).*)', // Skip Next.js internals and all static files, unless found in search params
  ],
  runtime: 'nodejs',
}
