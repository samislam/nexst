'use client'

import { useRouter, useSearchParams } from 'next/navigation'

/**
 * Returns a method than can be called to navigate the user back based on the default `?coming-from`
 * field. This hook can be used in client-side only
 */
export const useBack = () => {
  const search = useSearchParams()
  const router = useRouter()
  const back = (fallbackPath?: string) => {
    const from = search.get('coming-from')
    if (from) router.push(from)
    else if (fallbackPath) router.push(fallbackPath)
    else router.back()
  }
  return {
    back,
    get isStacked() {
      const from = search.get('coming-from')
      return !!from
    },
  }
}
