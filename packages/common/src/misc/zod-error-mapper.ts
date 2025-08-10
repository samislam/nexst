import type { ZodError, ZodIssue } from 'zod'

/** Represents a single validation issue after mapping from Zod. */
export type ZodIssueItem = {
  /**
   * Dot-joined path to the field; if the path is empty, `_form` is used. E.g., `['user','email']`
   * -> "user.email".
   */
  path: string
  /** Machine-readable error code for i18n mapping or client logic. E.g., "required", "min", "email". */
  code: string
  /**
   * Optional parameters for i18n interpolation or conditional rendering. E.g., `{ min: 8 }` for a
   * min-length validation.
   */
  params?: Record<string, unknown>
  /** Original Zod error message. This is useful for debugging or non-client consumers like Postman. */
  message?: string
}

/** Options for customizing the Zod error mapping behavior. */
export type ZodErrorMapperOptions = {
  /**
   * Whether to expand union errors into their branch-specific issues. Adds `params.unionBranch` to
   * indicate the branch index.
   */
  expandUnion?: boolean
  /** Character/string used to join path segments. Defaults to `"."`. */
  pathSeparator?: string
  /**
   * Optional hook that is called when an unmapped Zod issue code is encountered. Useful for
   * telemetry or error reporting.
   */
  onUnmappedIssue?: (issue: ZodIssue) => void
}

/**
 * Creates a manual Zod-like issue.
 *
 * @example
 *   ;```ts
 *   makeIssue('email', 'email_banned', 'Email is not allowed', { reason: 'blacklist' })
 *   ```
 */
export const makeIssue = (
  path: string,
  code: string,
  message?: string,
  params?: Record<string, unknown>
): ZodIssueItem => ({
  path,
  code,
  ...(params ? { params } : {}),
  ...(message ? { message } : {}),
})

/** Type guard to check if an unknown value is a ZodError. */
export function isZodError(e: unknown): e is ZodError {
  return !!e && typeof e === 'object' && 'issues' in e && Array.isArray(e.issues)
}

/**
 * Maps a ZodError to an array of simplified, stable, and optionally localized issue objects. This
 * function is intended to provide:
 *
 * - Stable machine-readable codes (`code`)
 * - Original messages for debugging
 * - Optional interpolation params for i18n
 * - Optional union branch expansion
 * - Optional manual issues (e.g., from `.refine()` or custom logic)
 *
 * @example
 *   ;```ts
 *   try {
 *     schema.parse(data)
 *   } catch (e) {
 *     if (isZodError(e)) {
 *       const issues = mapZodError(e, [
 *         makeIssue('_form', 'email_banned', 'Email is not allowed')
 *       ], { expandUnion: true })
 *       return NextResponse.json({ errors: issues }, { status: 400 })
 *     }
 *   }
 *   ```
 *
 * @param err - The ZodError instance to map.
 * @param extras - Optional array of manually created issues to append to the output.
 * @param opts - Optional mapping behavior overrides.
 * @returns An array of {@link ZodIssueItem} objects describing each validation issue.
 */
export function mapZodError(
  err: ZodError,
  extras?: ZodIssueItem[],
  opts?: ZodErrorMapperOptions
): ZodIssueItem[] {
  const sep = opts?.pathSeparator ?? '.'
  const out: ZodIssueItem[] = []

  /** Converts a Zod path array to a string using the configured separator. */
  const toPath = (p: (string | number)[]) => (p.length ? p.join(sep) : '_form')

  /** Maps a single ZodIssue into our simplified format. */
  const map = (issue: ZodIssue): Omit<ZodIssueItem, 'path'> => {
    const baseMessage = issue.message || ''

    switch (issue.code) {
      case 'invalid_type': {
        const i = issue
        if (i.received === 'undefined') return { code: 'required', message: baseMessage }
        return {
          code: 'type',
          params: { expected: i.expected, received: i.received },
          message: baseMessage,
        }
      }
      case 'invalid_string': {
        const v = issue.validation as string | undefined
        if (v === 'regex') return { code: 'regex', message: baseMessage }
        return { code: v ?? 'string_invalid', message: baseMessage }
      }
      case 'too_small': {
        const i = issue
        return {
          code: 'min',
          params: { min: i.minimum, inclusive: !!i.inclusive, type: i.type },
          message: baseMessage,
        }
      }
      case 'too_big': {
        const i = issue
        return {
          code: 'max',
          params: { max: i.maximum, inclusive: !!i.inclusive, type: i.type },
          message: baseMessage,
        }
      }
      case 'invalid_enum_value': {
        const i = issue
        return { code: 'one_of', params: { options: i.options }, message: baseMessage }
      }
      case 'invalid_union':
        return { code: 'union', message: baseMessage }
      case 'invalid_union_discriminator':
        return { code: 'union_discriminator', message: baseMessage }
      case 'unrecognized_keys': {
        const i = issue
        return { code: 'unknown_keys', params: { keys: i.keys }, message: baseMessage }
      }
      case 'invalid_arguments':
        return { code: 'fn_args', message: baseMessage }
      case 'invalid_return_type':
        return { code: 'fn_return', message: baseMessage }
      case 'invalid_date':
        return { code: 'date', message: baseMessage }
      case 'invalid_intersection_types':
        return { code: 'intersection', message: baseMessage }
      case 'not_multiple_of': {
        const i = issue
        return { code: 'multiple_of', params: { multipleOf: i.multipleOf }, message: baseMessage }
      }
      case 'not_finite':
        return { code: 'finite', message: baseMessage }
      case 'custom':
        return { code: 'custom', message: baseMessage }
      default: {
        if (opts?.onUnmappedIssue) {
          try {
            opts.onUnmappedIssue(issue)
          } catch {
            /** Ignore hook errors */
          }
        } else if (process.env.NODE_ENV !== 'production') {
          console.warn('[zod-error-mapper] Unmapped Zod issue:', {
            code: issue.code,
            path: issue.path,
            message: issue.message,
          })
        }
        return { code: 'invalid', params: { zodCode: issue.code }, message: baseMessage }
      }
    }
  }

  // Iterate through all issues and map them
  for (const issue of err.issues) {
    if (opts?.expandUnion && issue.code === 'invalid_union') {
      const i = issue
      const branches: ZodError[] | undefined = i.unionErrors
      if (Array.isArray(branches) && branches.length) {
        branches.forEach((branchErr, branchIdx) => {
          branchErr.issues.forEach((sub) => {
            const m = map(sub)
            out.push({
              path: toPath(sub.path),
              code: m.code,
              params: { ...(m.params || {}), unionBranch: branchIdx },
              message: m.message,
            })
          })
        })
        continue
      }
    }
    const m = map(issue)
    out.push({ path: toPath(issue.path), code: m.code, params: m.params, message: m.message })
  }

  // Append manually provided issues
  return extras && extras.length ? out.concat(extras) : out
}
