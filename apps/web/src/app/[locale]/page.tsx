import { ServerLocale } from './server-locale'
import { ClientLocale } from './client-locale'
import { BasedOnClient } from './based-on-client'
import { BasedOnServer } from './based-on-server'
import { ThemeSwitcher } from '@/components/common/theme-switcher'
import { LanguageSwitcher } from '@/components/common/language-switcher'

const Page = async () => {
  return (
    <div className="flex h-screen min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-serif text-4xl font-bold">Nexst template website</h1>
      <LanguageSwitcher />
      <ThemeSwitcher />
      <ServerLocale />
      <ClientLocale />
      <BasedOnClient />
      <BasedOnServer />
    </div>
  )
}
export default Page
