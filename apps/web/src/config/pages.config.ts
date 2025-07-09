import { PagesDefs } from '@/types/pagedef.types'

export const pageDefs = {
  home: {
    label: '@t<home>',
    icon: 'mdi:mdiHome',
    href: '/',
  },
} as const satisfies PagesDefs
