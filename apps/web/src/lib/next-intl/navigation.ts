import { appRoutingDef } from './app-routing-def'
import { createNavigation } from 'next-intl/navigation'

/**
 * ✅ Custom i18n-aware navigation helpers.
 *
 * These wrappers automatically handle locale prefixes and localized pathnames, avoiding unnecessary
 * redirects that can occur if you use Next.js’ default `<Link>`, `useRouter`, or `usePathname`
 * without a locale.
 *
 * 👉 Prefer using these instead of the base Next.js navigation utilities when working with
 * localized routes, for better performance and SEO.
 *
 * If you use the default Next.js APIs with missing locale prefixes, the middleware will still
 * redirect to the correct locale, but this adds an extra request round-trip.
 *
 * @see https://next-intl.dev/docs/routing/navigation
 */

export const {
  //
  Link,
  redirect,
  useRouter,
  usePathname,
  getPathname,
  permanentRedirect,
} = createNavigation(appRoutingDef)
