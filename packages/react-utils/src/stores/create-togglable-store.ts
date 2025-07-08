import { create } from 'zustand'

export interface TogglableStore {
  open: () => void
  close: () => void
  toggle: () => void
  isOpen: boolean
}

export const createTogglableStore = (defaultState = false) => {
  return create<TogglableStore>((set) => ({
    close() {
      set({ isOpen: false })
    },
    open() {
      set({ isOpen: true })
    },
    toggle() {
      set((state) => ({ isOpen: !state.isOpen }))
    },
    isOpen: defaultState,
  }))
}
