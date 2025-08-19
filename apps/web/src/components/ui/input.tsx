import * as React from 'react'
import { cn } from '@repo/react-utils'
import { type LibraryIcon, LibIcon } from '@repo/react-utils'

export type InputProps = React.ComponentProps<'input'> & {
  icon?: LibraryIcon
  iconClassName?: string
  rootClassname?: string
  endAction?: React.ReactNode
  dir?: 'ltr' | 'rtl' | 'auto'
  startAction?: React.ReactNode
  iconPosition?: 'start' | 'end'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    type,
    icon,
    className,
    startAction,
    endAction,
    iconClassName,
    iconPosition = 'start',
    rootClassname,
    dir,
    ...rest
  } = props

  const hasIcon = !!icon
  const hasAction = !!startAction || !!endAction
  const hasStartIcon = hasIcon && iconPosition === 'start'
  const hasEndIcon = hasIcon && iconPosition === 'end'
  const hasStartAction = hasAction && !!startAction
  const hasEndAction = hasAction && !!endAction
  const iconEl = hasIcon ? (
    <LibIcon icon={icon} className={cn('h-4 w-4 text-muted-foreground', iconClassName)} />
  ) : null

  return (
    <div
      className={cn(
        // container styles
        'flex h-9 w-full min-w-0 items-center rounded-md border border-input px-3 py-1',
        'bg-background shadow-sm transition-colors',
        // react to child focus
        'focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/50',
        // invalid state if the INPUT carries aria-invalid
        'aria-[invalid=true]:border-destructive focus-within:aria-[invalid=true]:ring-destructive/40',
        // disabled state if the INPUT is disabled (visual only)
        'disabled:cursor-not-allowed disabled:opacity-50',
        rootClassname
      )}
    >
      {hasStartIcon && <div className="ltr:pr-2 rtl:pl-2">{iconEl}</div>}
      {hasStartAction && <div className="ltr:pr-2 rtl:pl-2">{startAction}</div>}
      <input
        ref={ref}
        dir={dir}
        type={type}
        data-slot="input"
        className={cn(
          'm-0 w-full rounded-none border-0 bg-transparent p-0 outline-none',
          'text-base font-semibold md:text-sm',
          'placeholder:text-muted-foreground',
          'selection:bg-primary selection:text-primary-foreground',
          // only matters for type='file'
          'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
          className
        )}
        {...rest}
      />
      {hasEndIcon && <div className="ltr:pl-2 rtl:pr-2">{iconEl}</div>}
      {hasEndAction && <div className="ltr:pl-2 rtl:pr-2">{endAction}</div>}
    </div>
  )
})

Input.displayName = 'Input'
export { Input }
