import { PageDef } from '@/types/pagedef'

// # You can find more icons at: https://pictogrammers.com/library/mdi/

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
} as const satisfies { [k: string]: PageDef }
