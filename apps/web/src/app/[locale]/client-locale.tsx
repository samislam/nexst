'use client'

import React from 'react'
import { useTranslate } from '@tolgee/react'

export const ClientLocale = () => {
  const { t } = useTranslate()
  return <div className="bg-yellow-400 text-lg font-bold">{t('@t<client-locale>')}</div>
}
