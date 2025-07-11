'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import appConfig from '@/config/app.config'
import { LOCALE_COOKIE_NAME } from '@/constants'
import { AppLanguages } from '@/types/app.types'

export async function changeLocale(newLocale: AppLanguages, currentPath: string) {
  const cookieStore = await cookies()
  cookieStore.set(LOCALE_COOKIE_NAME, newLocale, appConfig.i18nRoutingDef.localeCookie)
  redirect(currentPath) // 👈 redirect to current page to re-resolve the locale
}
