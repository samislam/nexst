import { AxiosError, AxiosResponse } from 'axios'

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

export async function proxyApiCall<T>(apiCall: Promise<AxiosResponse<T>>): Promise<ApiResult<T>> {
  try {
    const res = await apiCall
    return {
      success: true,
      statusCode: res.status,
      payload: res.data,
    }
  } catch (err) {
    const axiosErr = err as AxiosError<{ error?: string }>
    return {
      success: false,
      statusCode: axiosErr.response?.status ?? 500,
      error: axiosErr.response?.data?.error ?? axiosErr.message,
    }
  }
}

export function apiResult<T, E extends object = {}>(
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
