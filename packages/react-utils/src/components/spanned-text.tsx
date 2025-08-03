'use client'

import React from 'react'
import { T } from '@tolgee/react'

export interface SpannedTextProps {
  tolgeeKey: string
  className?: string
  params?: Record<string, string | number | ((children: React.ReactNode) => React.ReactNode)>
}

export const SpannedText = (props: SpannedTextProps) => {
  const { tolgeeKey, className, params = {} } = props
  return (
    <T
      keyName={tolgeeKey}
      params={{
        ...params,
        span: (children) => {
          return (
            <React.Fragment key={tolgeeKey}>
              <span className={className}>{children}</span>
            </React.Fragment>
          )
        },
      }}
    />
  )
}
