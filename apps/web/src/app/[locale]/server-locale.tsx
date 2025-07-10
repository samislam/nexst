import React from 'react'
import { getTranslate } from '@/lib/tolgee/tolgee-server'

export const ServerLocale = async () => {
  const t = await getTranslate()
  return <div className="bg-yellow-400 text-lg font-bold">{t('@t<server-locale>')}</div>
}
