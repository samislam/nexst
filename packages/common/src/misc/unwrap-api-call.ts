import to from 'await-to-js'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiResult, FailureResult } from './api-call'
import { apiFailureResult, apiSuccessResult } from './api-call'

/**
 * Unwraps the result of an API call.
 *
 * If the API call was successful, it returns the payload. Otherwise, it throws an error with the
 * provided message.
 *
 * @template T - The type of the expected payload.
 * @param {ApiResult<T>} res - The result object returned from the API call.
 * @returns {T} The unwrapped payload.
 * @throws {Error} If `res.success` is false, throws an error with `res.error`.
 */
export const unwrapApiCall = <T>(res: ApiResult<T>): T => {
  if (!res.success) throw new Error(res.error)
  return res.payload!
}

/**
 * Unwraps an Axios API call that returns an `ApiResult<T, C>` object, converting it into a
 * consistent `ApiResult<T, C>` without throwing.
 *
 * Optionally, you can set `throwOnError = true` to make it behave like `unwrapApiCall`, which will
 * throw an `Error` when the result is a failure.
 *
 * @template T - The payload type for successful responses.
 * @template C - The string literal union type for error codes.
 * @param axiosApiCall - A promise representing the Axios request returning `ApiResult<T, C>`.
 * @param throwOnError - If true, throws on error instead of returning a failure result.
 * @returns A promise that resolves to a normalized `ApiResult<T, C>` — or throws if `throwOnError`
 *   is true and `success` is false.
 */
export const unwrapAxiosApiCall = async <T, C extends string = string>(
  axiosApiCall: Promise<AxiosResponse<ApiResult<T, C>>>,
  throwOnError = false
): Promise<ApiResult<T, C>> => {
  const [err, res] = await to(axiosApiCall)

  let finalResult: ApiResult<T, C>

  // 1️⃣ Case 1: Axios threw due to status code (400, 500, etc.)
  if (err) {
    const axiosErr = err as AxiosError<FailureResult<C>>
    if (axiosErr.response) {
      const data = axiosErr.response.data
      if (data.success === false) {
        finalResult = apiFailureResult({
          ...data,
          statusCode: data.statusCode ?? axiosErr.response.status,
        })
      } else {
        finalResult = apiFailureResult({
          error: data?.error ?? axiosErr.message,
          errorCode: data?.errorCode,
          statusCode: axiosErr.response.status,
        })
      }
    } else {
      // 3️⃣ Case 3: No response => network or unexpected error
      finalResult = apiFailureResult({
        error: axiosErr.message,
        statusCode: 0,
      })
    }
  } else {
    // 2️⃣ Case 2: Axios did not throw, check `success` field
    const data = res.data
    if (data.success === true) {
      finalResult = apiSuccessResult({
        ...data,
        statusCode: data.statusCode ?? res.status,
      })
    } else {
      // 4️⃣ No throw, but success is false
      finalResult = apiFailureResult({
        ...data,
        statusCode: data.statusCode ?? res.status,
      })
    }
  }

  // 🔹 Optionally throw like unwrapApiCall
  if (throwOnError) {
    return unwrapApiCall(finalResult) as never // This will throw if not success
  }

  return finalResult
}
