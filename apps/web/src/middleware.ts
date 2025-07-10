import createMiddleware from 'next-intl/middleware'
import { middlewareStack } from 'nextjs-middleware-stack'
import { appRoutingDef } from './lib/next-intl/app-routing-def'

export default middlewareStack([
  ['*', createMiddleware(appRoutingDef)],
  // ... your other middlewares
])

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
