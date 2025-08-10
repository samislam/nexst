import { createErrorHandler } from '@repo/common'
import { globalRouteErrorHandler } from './global-error-handlers'
import { globalActionErrorHandler } from './global-error-handlers'

export const withCatchErrorResponse = createErrorHandler(globalRouteErrorHandler)
export const withCatchErrorAction = createErrorHandler(globalActionErrorHandler)
