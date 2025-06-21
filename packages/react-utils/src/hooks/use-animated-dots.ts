import { useEffect, useState } from 'react'

/**
 * UseAnimatedDots
 *
 * Returns a string of animated dots (".", "..", "...") for loading indicators.
 *
 * @param intervalMs - Interval between dot changes (default: 400ms)
 * @param maxDots - Maximum number of dots to show (default: 3)
 * @returns A string with the current animated dots
 */
export const useAnimatedDots = (intervalMs = 400, maxDots = 3): string => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev + 1) % (maxDots + 1))
    }, intervalMs)

    return () => clearInterval(interval)
  }, [intervalMs, maxDots])

  return '.'.repeat(count)
}
