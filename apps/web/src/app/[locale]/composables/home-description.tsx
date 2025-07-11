'use client'

import { T } from '@tolgee/react'
import { pageDefs } from '@/config/pages.config'

export const HomeDescription = () => {
  return (
    <div className="mt-4 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
      <T
        keyName={pageDefs.home.description}
        params={{
          b: (children) => <b className="font-semibold text-foreground">{children}</b>,
        }}
      />
    </div>
  )
}
