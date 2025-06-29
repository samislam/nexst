/** Converts a string to a number */
export const stringToNumber = (str: string): number => +str
/** Converts a number to a string */
export const numberToString = (num: number): string => String(num)
/** Converts a boolean to 0 or 1 */
export const booleanToNumber = (bool: boolean): 0 | 1 => (bool ? 1 : 0)
/** Converts 0 or 1 to boolean */
export const numberToBoolean = (num: 0 | 1): boolean => Boolean(num)
/** Converts the given value only if it's not null */
export function keepNull<T, R>(val: T | null, transformer: (val: T) => R): R | null {
  return val === null ? null : transformer(val)
}

/** Converts an enum into a its actual value defined in a map */
export const enumToValue = <T extends { [K in keyof T]: T[K] }>(enumMap: T, value: keyof T) => {
  return enumMap[value]
}
/** Converts a value back into its enum defined in a map */
export function valueToEnum<T extends Record<string, unknown>, V extends T[keyof T]>(
  enumMap: T,
  value: V
): keyof T | undefined {
  for (const [key, val] of Object.entries(enumMap)) {
    if (val === value) {
      return key as keyof T
    }
  }
  return undefined // in case no match
}

/** A static time format used by the DMA */
export const toHHMMSS = (seconds: number) => {
  const hours = Math.floor(seconds / 3600) // Get whole hours
  const minutes = Math.floor((seconds % 3600) / 60) // Get remaining minutes
  const remainingSeconds = seconds % 60 // Get remaining seconds

  // Pad each value with leading zeros and return formatted time
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    remainingSeconds.toString().padStart(2, '0'),
  ].join(':')
}
