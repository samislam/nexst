'use client'

import { useState, useCallback } from 'react'

/**
 * Custom React hook for smoothly scrolling to a section by its ID.
 *
 * @example
 *   const [current, scroll] = useScroll()
 *   scroll('contact') // or scroll('#contact')
 *
 * @returns A tuple:
 *
 *   - `current`: The ID of the last section that was scrolled to (or `null` if none).
 *   - `scroll`: A function that scrolls to the given element ID or hash.
 */
export const useScroll = (): [string | null, (idOrHash: string) => void] => {
  const [current, setCurrentSection] = useState<string | null>(null)

  const scroll = useCallback((idOrHash: string) => {
    const id = idOrHash.startsWith('#') ? idOrHash.slice(1) : idOrHash
    const el = document.getElementById(id)
    console.log({ id, el })
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setCurrentSection(id)
    }
  }, [])

  return [current, scroll]
}
