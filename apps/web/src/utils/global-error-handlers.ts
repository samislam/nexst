import { NextResponse } from 'next/server'
import { AppErrorCodes, UNKNOWN_ERR } from '@/constants'
import { apiFailureResult, apiResult, FailureResult, SyncErrorHandler } from '@repo/common'

export const logError = (error: unknown) => {
  let logMessage = error instanceof Error ? error.message : null
  console.error('Unexpected error happened!', logMessage ?? error)
  return logMessage
}

export const globalRouteErrorHandler: SyncErrorHandler<Response> = (error: unknown) => {
  logError(error)
  if (error instanceof SyntaxError) {
    return NextResponse.json(
      apiFailureResult({
        statusCode: 400,
        error: 'Malformed request body',
      }),
      { status: 400 }
    )
  }
  return NextResponse.json({ message: 'unexpected error!' }, { status: 500 })
}

export const globalActionErrorHandler: SyncErrorHandler<FailureResult<AppErrorCodes>> = (
  error: unknown
) => {
  logError(error)
  return apiResult({
    success: false,
    statusCode: 500,
    errorCode: UNKNOWN_ERR,
    error: UNKNOWN_ERR,
  })
}
