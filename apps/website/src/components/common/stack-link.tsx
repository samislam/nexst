'use client'

import { PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export interface StackLinkProps extends LinkProps {
  fallbackUrl?: string // optional: fallback if no pathname
}

/**
 * StackLink wraps Next.js Link and appends the current path + search as a `coming-from` param
 * automatically.
 */
export const StackLink = (props: PropsWithChildren<StackLinkProps>) => {
  const { href, fallbackUrl, children, ...rest } = props
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`

  const finalHref =
    typeof href === 'string'
      ? `${href}${href.includes('?') ? '&' : '?'}coming-from=${encodeURIComponent(
          currentUrl || fallbackUrl || '/'
        )}`
      : href // for object URLs, you could extend logic if needed

  return (
    <Link href={finalHref} {...rest}>
      {children}
    </Link>
  )
}
