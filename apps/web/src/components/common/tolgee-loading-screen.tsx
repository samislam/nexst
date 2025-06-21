'use client'
import React from 'react'
import { useTranslate } from '@tolgee/react'
import { LoadingScreen } from './loading-screen'
import { useLocaleTransition } from '@/hooks/use-locale-transition'

export const TolgeeLoadingScreen = () => {
  const { t } = useTranslate()
  const isTransitioning = useLocaleTransition((state) => state.isChangingLocale)
  return (
    <LoadingScreen
      isVisible={isTransitioning}
      loadingText={t('@t<switching-language-loading-screen-text>')}
    />
  )
}
