import ms from 'ms'
import { create } from 'zustand'

export interface LocaleTransitioningStore<P extends string> {
  start: (
    pendingLanguage: P,
    opts?: { disableRTLSwitcher?: boolean; RTLSwitcherOnDelay?: number }
  ) => Promise<void>
  stop: (opts?: { offDelay?: number }) => Promise<void>
  pendingLanguage?: P
  isChangingLocale: boolean
}

export const createLocaleTransitionStore = <P extends string>() =>
  create<LocaleTransitioningStore<P>>((set, get) => ({
    start(pendingLanguage, opts) {
      return new Promise((resolve) => {
        const { disableRTLSwitcher = false, RTLSwitcherOnDelay = ms('1s') } = opts ?? {}
        setTimeout(() => {
          if (!disableRTLSwitcher) {
            const state = get()
            document.documentElement.setAttribute(
              'dir',
              state.pendingLanguage === 'ar' ? 'rtl' : 'ltr'
            )
            resolve()
          }
        }, RTLSwitcherOnDelay)
        set({ isChangingLocale: true, pendingLanguage })
        if (disableRTLSwitcher) resolve()
      })
    },
    stop(opts) {
      return new Promise((resolve) => {
        const { offDelay = ms('2s') } = opts ?? {}
        setTimeout(() => {
          set({ isChangingLocale: false })
          resolve()
        }, offDelay)
      })
    },

    isChangingLocale: false,
  }))
