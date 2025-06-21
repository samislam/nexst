'use client'

import { useEffect } from 'react'
import { useScroll } from '@repo/react-utils'

/** Scrolls to the section defined in the current URL hash on initial page load. Does not attach any */
export const ClientPlugger = () => {
  const [, scroll] = useScroll()

  useEffect(() => {
    const hash = window.location.hash
    if (hash) scroll(hash)
  }, [scroll])

  return null
}
