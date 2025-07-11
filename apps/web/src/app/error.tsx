'use client'

import { useEffect } from 'react'
import { useTranslate } from '@tolgee/react'
import { MotionDiv } from '@repo/react-utils'
import { pageDefs } from '@/config/pages.config'
import { Link } from '@/lib/next-intl/navigation'
import { Button, buttonVariants } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error(props: ErrorProps) {
  const { error, reset } = props
  const { t } = useTranslate()
  useEffect(() => console.error(error), [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8 text-center">
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl font-extrabold text-gray-900">{t('@t<error-page-title>')}</h1>
          <MotionDiv
            className="mt-2 text-primary"
            animate={{
              scale: [1, 1.1, 1],
              transition: { repeat: Infinity, duration: 2 },
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mx-auto h-16 w-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </MotionDiv>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className="mb-6 text-2xl font-medium text-gray-600">
            {t('@t<error-page-description>')}
          </p>
          <p className="text-md mb-6 text-gray-500">
            {error.message || 'An unexpected error occurred'}
          </p>
          <div className="mt-5 space-y-3">
            <Button onClick={reset} size="lg" className="w-full font-semibold">
              {t('@t<error-page-tryagain-button-text>')}
            </Button>
            <Link
              href={pageDefs.home.href}
              className={buttonVariants({
                size: 'lg',
                variant: 'outline',
                className: 'w-full font-semibold',
              })}
            >
              {t('@t<error-page-backhome-button-text>')}
            </Link>
          </div>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-sm text-gray-500">{t('@t<error-page-help-line>')}</p>
        </MotionDiv>
      </div>
    </div>
  )
}
