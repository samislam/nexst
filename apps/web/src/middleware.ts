import createMiddleware from 'next-intl/middleware'
import { middlewareStack } from 'nextjs-middleware-stack'
import { appRoutingDef } from './lib/next-intl/app-routing-def'

const regExp = {
  i18nExclude: /^(?!.*\/(api|_next\/static|_next\/image|favicon\.ico)).*$/,
  // Always run for API routes
  middlewareInclude: /\/(api|trpc)(.*)/,
  // Skip Next.js internals and all static files, unless found in search params
  middlewareExclude:
    /\/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)/,
}

export default middlewareStack([
  // ... your other middlewares
  [regExp.i18nExclude, createMiddleware(appRoutingDef)],
])

export const config = {
  matcher: [regExp.middlewareExclude, regExp.middlewareInclude],
  runtime: 'nodejs',
}
