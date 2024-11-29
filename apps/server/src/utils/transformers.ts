/** Converts a string to a number */
export const stringToNumber = (str: string): number => +str
/** Converts a number to a string */
export const numberToString = (num: number): string => String(num)
/** Converts a boolean to 0 or 1 */
export const booleanToNumber = (bool: boolean): 0 | 1 => (bool ? 1 : 0)
/** Converts 0 or 1 to boolean */
export const numberToBoolean = (num: 0 | 1): boolean => Boolean(num)
/** Converts the given value only if it's not null */
export const keepNull = (val: any, transformer: (val: any) => any) => {
  return val === null ? null : transformer(val)
}
