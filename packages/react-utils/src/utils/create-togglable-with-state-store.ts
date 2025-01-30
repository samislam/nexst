import { create } from 'zustand'

export type TogglableStoreWithState<T> = {
  isOpen: boolean
  open: (openedItem: T) => void
  close: () => void
  toggle: () => boolean
  openedItem: T | null
}

export const createTogglableWithStateStore = <T>() => {
  return create<TogglableStoreWithState<T>>((set) => ({
    isOpen: false,
    open: (openedItem) => set(() => ({ isOpen: true, openedItem })),
    close: () => set(() => ({ isOpen: false })),
    toggle: () => {
      let newState: boolean
      set((state) => {
        newState = !state.isOpen
        return { isOpen: newState }
      })
      return newState!
    },
    openedItem: null,
  }))
}
