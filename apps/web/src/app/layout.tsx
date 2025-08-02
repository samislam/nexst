import localFont from 'next/font/local'
import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'
import appConfig from '@/config/app.config'
import { getLocale } from 'next-intl/server'
import { ClientPlugger } from './client-plugger'
import { AppLanguages } from '@/types/app.types'
import { pageDefs } from '@/config/pages.config'
import { NextIntlClientProvider } from 'next-intl'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { MetadataGenerateFn } from '@repo/react-utils'
import { getStaticData } from '@/lib/tolgee/tolgee-shared'
import { TolgeeNextProvider } from '@/lib/tolgee/tolgee-client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TolgeeLoadingScreen } from '@/components/common/tolgee-loading-screen'
import { TanstackQueryProvider } from '@/lib/tanstack-query/tanstack-query-provider'
import './globals.css'

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>
}

export default async function RootLayout(props: Props) {
  const { children } = props
  const locale = (await getLocale()) as AppLanguages
  const locales = await getStaticData([appConfig.fallbackLanguage, locale])

  return (
    <NextIntlClientProvider locale={locale}>
      <TolgeeNextProvider locale={locale} locales={locales}>
        <html dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale} suppressHydrationWarning>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <ThemeProvider
              enableSystem
              attribute="class"
              defaultTheme={appConfig.defaultTheme}
              disableTransitionOnChange
            >
              <TanstackQueryProvider>
                <NuqsAdapter>
                  {children}
                  <ReactQueryDevtools initialIsOpen={false} />
                  <TolgeeLoadingScreen />
                  <ClientPlugger />
                </NuqsAdapter>
              </TanstackQueryProvider>
            </ThemeProvider>
          </body>
        </html>
      </TolgeeNextProvider>
    </NextIntlClientProvider>
  )
}

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const generateMetadata: MetadataGenerateFn = pageDefs.home.meta
