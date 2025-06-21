import ms from 'ms'
import { create } from 'zustand'
import { AppLanguages } from '@/types/app-config'

export interface LocaleTransitioningStore {
  start: (pendingLanguage: AppLanguages) => void
  stop: (opts?: { disableRTLSwitcher?: boolean; loadingDurationMs?: number }) => void
  pendingLanguage?: AppLanguages
  isChangingLocale: boolean
}

export const useLocaleTransition = create<LocaleTransitioningStore>((set, get) => ({
  start(pendingLanguage) {
    set({ isChangingLocale: true, pendingLanguage })
  },
  stop(opts = {}) {
    const { disableRTLSwitcher, loadingDurationMs = ms('3s') } = opts
    if (!disableRTLSwitcher) {
      const state = get()
      document.documentElement.setAttribute('dir', state.pendingLanguage === 'ar' ? 'rtl' : 'ltr')
    }
    setTimeout(() => {
      set({ isChangingLocale: false })
    }, loadingDurationMs)
  },

  isChangingLocale: false,
}))
