'use client'

import { useEffect } from 'react'
import { useScroll } from '@repo/react-utils'

export const ClientPlugger = () => {
  const [, scroll] = useScroll()

  /**
   * Scrolls to the section defined in the current URL hash on initial page load. Does not attach
   * any
   */
  useEffect(() => {
    const hash = window.location.hash
    if (hash) scroll(hash)
  }, [scroll])

  return null
}
