import { ApiResult } from './proxy-api-call'

/**
 * Unwraps the result of a proxied API call.
 *
 * If the API call was successful, it returns the payload. Otherwise, it throws an error with the
 * provided message.
 *
 * @template T - The type of the expected payload.
 * @param {ApiResult<T>} res - The result object returned from the API call.
 * @returns {T} The unwrapped payload.
 * @throws {Error} If `res.success` is false, throws an error with `res.error`.
 */
export const unwrapProxiedApiCall = <T>(res: ApiResult<T>): T => {
  if (!res.success) throw new Error(res.error)
  return res.payload!
}
