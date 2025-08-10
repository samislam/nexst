export type SuccessResult<T> = {
  success: true
  payload: T
  statusCode?: number
}

export type FailureResult<C extends string = string> = {
  error: string
  success: false
  statusCode?: number
  errorCode?: C
}

export type ApiResult<T, C extends string = string> = SuccessResult<T> | FailureResult<C>

export function apiResult<T, E extends object = Record<string, unknown>>(
  params: (SuccessResult<T> & E) | (FailureResult & E)
): ApiResult<T> & E {
  if (params.success) {
    const { payload, statusCode = 200, success: _, ...rest } = params
    return {
      success: true,
      payload,
      statusCode,
      ...rest,
    } as const
  } else {
    const { error, statusCode = 500, success: _, ...rest } = params
    return {
      success: false,
      error,
      statusCode,
      ...rest,
    } as const
  }
}

export const apiFailureResult = <
  C extends string = string,
  E extends Record<string, unknown> = Record<string, unknown>,
>(
  params: E & Omit<FailureResult<C>, 'success'>
): FailureResult<C> & E => {
  return {
    success: false,
    ...params,
    statusCode: params.statusCode ?? 500,
  }
}

export const apiSuccessResult = <T, E extends Record<string, unknown> = Record<string, unknown>>(
  params: E & Omit<SuccessResult<T>, 'success'>
): SuccessResult<T> & E => {
  return {
    success: true,
    ...params,
    statusCode: params.statusCode ?? 200,
  }
}
