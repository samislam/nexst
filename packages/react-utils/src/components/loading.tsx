import clsx from 'clsx'
import { cn, LibIcon, LibraryIcon } from '@/exports'

export interface LoadingProps {
  label?: string
  thin?: boolean
  className?: string
  horizontal?: boolean
  iconClassName?: string
  labelClassName?: string
  loadingIcon?: LibraryIcon
}

export const Loading = (props: LoadingProps) => {
  const {
    label,
    className,
    thin = false,
    iconClassName,
    labelClassName,
    horizontal = false,
    loadingIcon = 'mdi:mdiLoading',
  } = props

  return (
    <div
      className={clsx(
        'flex items-center',
        horizontal ? 'flex-row gap-x-2' : 'flex-col gap-y-2',
        className
      )}
    >
      <LibIcon
        icon={loadingIcon}
        className={cn('animate-spin', thin ? 'h-4 w-4' : 'h-6 w-6', iconClassName)}
      />
      {label && (
        <span className={cn(thin ? 'font-normal text-sm' : 'font-bold', labelClassName)}>
          {label}
        </span>
      )}
    </div>
  )
}
