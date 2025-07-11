import { PagesDefs } from '@/types/pagedef.types'
import { getTranslate } from '@/lib/tolgee/tolgee-server'

export const pageDefs = {
  home: {
    label: '@t<home>',
    icon: 'mdi:mdiHome',
    href: '/',
    async meta() {
      const t = await getTranslate()
      return {
        title: t('@t<home_meta.title>'),
        description: t('@t<home_meta.description>'),
      }
    },
  },
} as const satisfies PagesDefs
