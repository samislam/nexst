'use client'

import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { useScroll } from '@repo/react-utils'
import { useFullPath } from '@/hooks/use-fullpath'

/** Props for the {@link ScrollLink} component. */
export interface ScrollLinkProps extends PropsWithChildren {
  /** The ID or hash of the section to scroll to. Example: `"contact"` or `"#contact"`. */
  hash: string
}

/**
 * A client-side link component that scrolls smoothly to a target section on the page.
 *
 * - It overrides the default `<Link>` behavior to scroll smoothly to a section instead of reloading.
 * - It updates the browser URL using `history.replaceState`.
 * - It strips the leading `#` from the hash if present to ensure correct DOM element targeting.
 *
 * @example
 *   ;```tsx
 *   <ScrollLink hash="#contact">Contact</ScrollLink>
 *   ```
 */
export const ScrollLink = (props: ScrollLinkProps) => {
  const { hash, children } = props
  const [, scroll] = useScroll()
  const fullPath = useFullPath()
  const id = hash.startsWith('#') ? hash.slice(1) : hash

  return (
    <Link
      href={`${fullPath}#${id}`}
      scroll={false}
      onClick={(e) => {
        e.preventDefault()
        scroll(id)
        history.replaceState(null, '', `${fullPath}#${id}`)
      }}
    >
      {children}
    </Link>
  )
}
