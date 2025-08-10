'use client'

import { useEffect } from 'react'
import { useTolgee } from '@tolgee/react'
import { useFullPath } from '@repo/react-utils'
import { AppLanguages } from '@/types/app.types'
import { useLocale as useLocaleNextIntl } from 'next-intl'
import { useLocaleTransition } from './use-locale-transition'
import { changeLocale } from '@/lib/next-intl/change-language'

export const useLocale = () => {
  const locale = useLocaleNextIntl() as AppLanguages
  const fullpath = useFullPath()

  const { changeLanguage: changeTolgeeLocale } = useTolgee()
  const startTransition = useLocaleTransition((state) => state.start)
  const stopTransition = useLocaleTransition((state) => state.stop)
  const isSwitching = useLocaleTransition((state) => state.isChangingLocale)

  const handleChangeLocale = (value: AppLanguages) => {
    startTransition(value)
    changeLocale(value, fullpath) // Change the server components locale
  }

  useEffect(() => {
    return () => {
      // Change the client-side components locale
      changeTolgeeLocale(locale)
      document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr')
      stopTransition()
    }
  }, [changeTolgeeLocale, locale, stopTransition])

  return {
    locale,
    isSwitching,
    changeLocale: handleChangeLocale,
    dir: locale === 'ar' ? 'rtl' : 'ltr',
  }
}
