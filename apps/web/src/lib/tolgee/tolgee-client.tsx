'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { TolgeeBase } from './tolgee-shared'
import { AppLanguages } from '@/types/app.types'
import { TolgeeProvider, TreeTranslationsData, useTolgeeSSR } from '@tolgee/react'

type TolgeeNextProviderProps = {
  locale: AppLanguages
  children: ReactNode
  locales: Record<AppLanguages, TreeTranslationsData | (() => Promise<TreeTranslationsData>)>
}

const tolgee = TolgeeBase().init()

export const TolgeeNextProvider = (props: TolgeeNextProviderProps) => {
  const { locale, locales, children } = props
  // Synchronize SSR and client first render
  const tolgeeSSR = useTolgeeSSR(tolgee, locale, locales)
  const router = useRouter()

  useEffect(() => {
    const { unsubscribe } = tolgeeSSR.on('permanentChange', () => {
      // Refresh page when there is a translation update
      router.refresh()
    })

    return () => unsubscribe()
  }, [tolgeeSSR, router])

  return (
    <TolgeeProvider tolgee={tolgeeSSR} options={{ useSuspense: false }}>
      {children}
    </TolgeeProvider>
  )
}
