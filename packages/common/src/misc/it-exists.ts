/**
 * This is a simple function used with the decorator `@ValidateIf(itExists)`. It considers only the
 * null, undefined, and empty string ("") values to be non-existent.
 */
export const itExists = (_: object, val: unknown): boolean =>
  val === false || val === 0 ? true : !!val
