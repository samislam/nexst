'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import appConfig from '@/config/app.config'
import { LOCALE_COOKIE } from '@/constants'
import { AppLanguages } from '@/types/app.types'

export async function changeLocale(newLocale: AppLanguages, currentPath: string) {
  const cookieStore = await cookies()
  cookieStore.set(LOCALE_COOKIE, newLocale, appConfig.i18nRoutingDef.localeCookie)
  redirect(currentPath) // 👈 redirect to current page to re-resolve the locale
}
