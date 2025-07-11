import React from 'react'
import Link from 'next/link'
import { BackButton } from '@repo/react-utils'
import { Button } from '@/components/ui/button'
import { pageDefs } from '@/config/pages.config'
import AppIcon from '@/components/common/app-icon'
import { ArrowLeftIcon, HomeIcon } from 'lucide-react'
import { getTranslate } from '@/lib/tolgee/tolgee-server'

const NotFoundPage = async () => {
  const t = await getTranslate()
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-green-100 p-4 dark:from-green-900 dark:to-green-800">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-8 animate-bounce">
          <AppIcon className="mx-auto h-20 w-20 text-green-400 dark:text-green-200" />
        </div>

        <h1 className="mb-4 text-7xl font-bold text-gray-800 dark:text-white">404</h1>
        <p className="mb-8 text-2xl text-green-700 dark:text-green-300">
          {t('@t<not-found-page-title>')}
        </p>

        <div className="mb-8 rounded-2xl bg-white/90 p-8 backdrop-blur-lg dark:bg-white/10">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {t('@t<not-found-page-description>')}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link
            href={pageDefs.home.href}
            className="group flex items-center space-x-2 rounded-lg bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
          >
            <HomeIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span>{t('@t<not-found-page-back-to-home>')}</span>
          </Link>
          <BackButton>
            <Button className="group flex items-center space-x-2 rounded-lg bg-emerald-50 bg-white/10 px-6 py-6 text-white transition-colors hover:bg-white/20 dark:bg-emerald-700">
              <ArrowLeftIcon className="h-5 w-5 text-gray-800 transition-transform group-hover:translate-x-[-4px] dark:text-white" />
              <span className="text-gray-800 dark:text-white">
                {t('@t<not-found-page-back-button-text>')}
              </span>
            </Button>
          </BackButton>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
