import ms from 'ms'
import { AppConfig } from '@/types/app.types'
import { LOCALE_COOKIE_NAME } from '@/constants'

export const createAppConfig = <L extends string>(ac: AppConfig<L>) => ac
