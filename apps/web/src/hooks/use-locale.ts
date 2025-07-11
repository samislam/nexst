'use client'

import { useTolgee } from '@tolgee/react'
import { useFullPath } from '@repo/react-utils'
import { useEffect, useTransition } from 'react'
import { AppLanguages } from '@/types/app.types'
import { useLocale as useLocaleNextIntl } from 'next-intl'
import { changeLocale } from '@/lib/next-intl/change-language'

export const useLocale = () => {
  const locale = useLocaleNextIntl() as AppLanguages
  const fullpath = useFullPath()

  const { changeLanguage: changeTolgeeLocale } = useTolgee()
  const [isSwitching, startTransition] = useTransition()

  const handleChangeLocale = (value: AppLanguages) => {
    startTransition(() => {
      // Change the server components locale
      changeLocale(value, fullpath)
    })
  }

  useEffect(() => {
    return () => {
      // Change the client-side components locale
      changeTolgeeLocale(locale)
      document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr')
    }
  }, [changeTolgeeLocale, locale])

  return {
    locale,
    isSwitching,
    changeLocale: handleChangeLocale,
  }
}
