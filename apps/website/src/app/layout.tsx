import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'
import appConfig from '@/config/app.config'
import { getLocale } from 'next-intl/server'
import { AppLanguages } from '@/types/app-config'
import { NextIntlClientProvider } from 'next-intl'
import { getTranslate } from '@/lib/tolgee/tolgee-server'
import { getStaticData } from '@/lib/tolgee/tolgee-shared'
import { TolgeeNextProvider } from '@/lib/tolgee/tolgee-client'

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>
}

export default async function RootLayout(props: Props) {
  const { children } = props
  const locale = (await getLocale()) as AppLanguages
  const locales = await getStaticData([appConfig.defaultLanguage, locale])
  return (
    <NextIntlClientProvider locale={locale}>
      <TolgeeNextProvider locale={locale} locales={locales}>
        <html dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale} suppressHydrationWarning>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <ThemeProvider
              attribute="class"
              enableSystem
              disableTransitionOnChange
              defaultTheme={appConfig.defaultTheme}
            >
              {children}
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

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslate()
  return {
    title: t('@t<title_homepage>'),
    description: t('@t<description_homepage>'),
  }
}
