'use client'

import { useTolgee } from '@tolgee/react'
import { useEffect, useTransition } from 'react'
import { AppLanguages } from '@/types/app.types'
import { useParams, usePathname, useRouter } from 'next/navigation'

export const useLocale = () => {
  const params = useParams()
  const locale = params.locale as AppLanguages
  const router = useRouter()
  const pathname = usePathname()
  const { changeLanguage } = useTolgee()
  const [isSwitching, startTransition] = useTransition()
  const changeLocale = (value: AppLanguages) => {
    startTransition(() => {
      // Change the server components locale
      router.replace(pathname.replace(locale, value), { scroll: false })
    })
  }

  useEffect(() => {
    return () => {
      // Change the client-side components locale
      changeLanguage(locale)
      document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr')
    }
  }, [changeLanguage, locale])

  return {
    locale,
    isSwitching,
    changeLocale,
  }
}
