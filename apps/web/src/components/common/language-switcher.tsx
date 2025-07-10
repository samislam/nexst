'use client'

import { cn } from '@repo/react-utils'
import { Skeleton } from '../ui/skeleton'
import { useLocale } from '@/hooks/use-locale'
import { SyriaFlag } from '../icons/syria-flag'
import { CanadaFlag } from '../icons/canada-flag'
import { TurkieyeFlag } from '../icons/turkieye-flag'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export interface LanguageSwitcherProps {
  className?: string
  skeletonClassName?: string
}
export const LanguageSwitcher = (props: LanguageSwitcherProps) => {
  const { className, skeletonClassName } = props
  const { changeLocale, isSwitching, locale } = useLocale()

  if (isSwitching) return <Skeleton className={cn('h-5 w-[180px]', skeletonClassName)} />
  return (
    <Select value={locale} onValueChange={changeLocale}>
      <SelectTrigger className={cn('w-[180px]', className)}>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <div className="flex items-center gap-2">
            <CanadaFlag className="h-4 w-4" />
            <span>English</span>
          </div>
        </SelectItem>
        <SelectItem value="tr">
          <div className="flex items-center gap-2">
            <TurkieyeFlag className="h-4 w-4" />
            <span>Türkçe</span>
          </div>
        </SelectItem>
        <SelectItem value="ar">
          <div className="flex items-center gap-2">
            <SyriaFlag className="h-4 w-4" />
            <span>العربية</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
