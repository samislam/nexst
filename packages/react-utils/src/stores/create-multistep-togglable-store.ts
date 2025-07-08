import { create } from 'zustand'

export interface MultiStepTogglableStore {
  open: () => void
  close: () => void
  isOpen: boolean
  nextStep: () => void
  previousStep: () => void
  currentStep: number
}

export const createMultiStepTogglableStore = (maxSteps: number, defaultState = false) => {
  return create<MultiStepTogglableStore>((set) => ({
    close() {
      set({ isOpen: false })
    },
    open() {
      set({ isOpen: true })
    },
    isOpen: defaultState,
    nextStep: () =>
      set((state) => ({
        currentStep: Math.min(state.currentStep + 1, maxSteps - 1),
      })),
    previousStep: () =>
      set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 0),
      })),
    currentStep: 0,
  }))
}
