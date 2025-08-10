import { AnyFunction } from '@/type-helpers/any-function'

// Overload 1: handler throws (rethrow mode) — preserves original return type T
export function createErrorHandler(
  globalErrorHandler: (error: unknown) => never
): <T extends AnyFunction>(fn: T) => T

// Overload 2: handler returns a value R (response mode) — wrapper returns union of T|R
export function createErrorHandler<R>(
  globalErrorHandler: (error: unknown) => R | Promise<R>
): <T extends AnyFunction>(
  fn: T
) => (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | Awaited<R>>

// Single implementation
export function createErrorHandler<R = never>(globalErrorHandler: ErrorHandler<R>) {
  return <T extends AnyFunction>(fn: T) => {
    return (async (...args: Parameters<T>) => {
      try {
        // supports sync & async functions uniformly
        return await fn(...args)
      } catch (err) {
        // Delegate to your global handler
        return await globalErrorHandler(err)
      }
    }) as unknown
  }
}

export type ErrorHandler<R = never> = (error: unknown) => R | Promise<R>
export type SyncErrorHandler<R = never> = (error: unknown) => R
export type AyncErrorHandler<R = never> = (error: unknown) => Promise<R>
