'use server'

import { cookies } from 'next/headers'
import { AppLanguages } from '@/types/app.types'

export const changeLanguage = async (language: AppLanguages) => {
  const cookieStore = await cookies()
  cookieStore.set('locale', language)
}
