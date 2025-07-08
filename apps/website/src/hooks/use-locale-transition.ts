import { AppLanguages } from '@/types/app.types'
import { createLocaleTransitionStore } from '@repo/react-utils'

export const useLocaleTransition = createLocaleTransitionStore<AppLanguages>()
