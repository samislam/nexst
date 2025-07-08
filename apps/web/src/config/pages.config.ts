import { PagesDefs } from '@/types/pagedef.types'

export const pageDefs = {
  home: {
    label: '@t<home>',
    icon: 'mdi:mdiHome',
    href: '/',
  },
  login: {
    label: '@t<login>',
    icon: 'mdi:mdiLogin',
    href: '/auth/login',
  },
} as const satisfies PagesDefs
