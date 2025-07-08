import { usePathname, useSearchParams } from 'next/navigation'

/**
 * A custom React hook that returns the current URL path along with its query string.
 *
 * This hook combines `usePathname()` and `useSearchParams()` from Next.js App Router to provide the
 * full relative URL (e.g., `/path/to/page?query=value`).
 *
 * Note: This hook must be used in a client component (`'use client'`) since it relies on
 * browser-side navigation state.
 *
 * @example
 *   // Given URL: /dashboard/users?page=2
 *   const fullPath = useFullPath()
 *   // fullPath → "/dashboard/users?page=2"
 *
 * @returns {string} The current pathname with query string appended if present.
 */
export const useFullPath = (): string => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const query = searchParams.toString()
  return query ? `${pathname}?${query}` : pathname
}
