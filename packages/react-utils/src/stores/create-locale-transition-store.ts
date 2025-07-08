import ms from 'ms'
import { create } from 'zustand'

export interface LocaleTransitioningStore<P extends string> {
  start: (pendingLanguage: P) => void
  stop: (opts?: { disableRTLSwitcher?: boolean; loadingDurationMs?: number }) => void
  pendingLanguage?: P
  isChangingLocale: boolean
}

export const createLocaleTransitionStore = <P extends string>() =>
  create<LocaleTransitioningStore<P>>((set, get) => ({
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
