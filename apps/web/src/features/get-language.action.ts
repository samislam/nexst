'use server'

import { cookies } from 'next/headers'
import appConfig from '@/config/app.config'
import { AppLanguages } from '@/types/app.types'

export const getLanguage = async (): Promise<AppLanguages> => {
  const cookieStore = await cookies()
  const value = (cookieStore.get('locale')?.value as AppLanguages) ?? appConfig.defaultLanguage
  return value
}
