import { LibraryIcon } from '@repo/react-utils'

export interface PageDef {
  href: string
  title?: string
  label: string
  /**
   * You can find more icons at:
   *
   * - https://pictogrammers.com/library/mdi/
   * - https://lucide.dev/icons/presentation
   */
  icon?: LibraryIcon
}

export type PagesDefs = { [k: string]: PageDef }
