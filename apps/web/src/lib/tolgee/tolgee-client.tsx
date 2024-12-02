'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { TolgeeBase } from './tolgee-shared'
import { AppLanguages } from '@/types/app-config'
import { TolgeeProvider, TreeTranslationsData, useTolgeeSSR } from '@tolgee/react'

type TolgeeNextProviderProps = {
  locale: AppLanguages
  children: ReactNode
  locales: Record<AppLanguages, TreeTranslationsData | (() => Promise<TreeTranslationsData>)>
}

const tolgee = TolgeeBase().init()

export const TolgeeNextProvider = ({ locale, locales, children }: TolgeeNextProviderProps) => {
  // Synchronize SSR and client first render
  const tolgeeSSR = useTolgeeSSR(tolgee, locale, locales)
  const router = useRouter()

  useEffect(() => {
    const { unsubscribe } = tolgeeSSR.on('update', () => {
      // Refresh page when there is a translation update
      // useNavigate.refresh()
    })

    return () => unsubscribe()
  }, [tolgeeSSR, router])

  return (
    <TolgeeProvider tolgee={tolgeeSSR} options={{ useSuspense: false }}>
      {children}
    </TolgeeProvider>
  )
}
