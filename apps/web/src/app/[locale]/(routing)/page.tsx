import { getTranslate } from '@/lib/tolgee/tolgee-server'
import { ThemeSwitcher } from '@/components/common/theme-switcher'
import { LanguageSwitcher } from '@/components/common/language-switcher'
import { HomeDescription } from '../composables/home-description'

const Page = async () => {
  const t = await getTranslate()
  return (
    <div className="flex h-screen min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-serif text-4xl font-bold">{t('@t<home-title>')}</h1>
      <HomeDescription />
      <LanguageSwitcher />
      <ThemeSwitcher />
    </div>
  )
}
export default Page
