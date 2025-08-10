import * as React from 'react'
import { cn } from '@repo/react-utils'
import { type LibraryIcon, LibIcon } from '@repo/react-utils'

export type InputProps = React.ComponentProps<'input'> & {
  icon?: LibraryIcon
  iconClassName?: string
  iconPosition?: 'start' | 'end'
  startAction?: React.ReactNode
  endAction?: React.ReactNode
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
    ...rest
  } = props

  const hasIcon = !!icon
  const hasStartIcon = hasIcon && iconPosition === 'start'
  const hasEndIcon = hasIcon && iconPosition === 'end'

  const iconElement = icon ? (
    <LibIcon icon={icon} className={cn('h-4 w-4 text-muted-foreground', iconClassName)} />
  ) : null

  const rootClass = cn(
    'flex h-9 w-full items-center rounded-md border border-input bg-background py-1 text-base shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    // conditional inline paddings to avoid extra space before/after icons
    hasStartIcon || startAction ? 'ps-4' : 'ps-8',
    hasEndIcon || endAction ? 'pe-4' : 'pe-8',
    className
  )

  return (
    <div className={rootClass}>
      {(hasStartIcon || startAction) && (
        <div className="me-2 flex items-center gap-2">
          {hasStartIcon && iconElement}
          {startAction}
        </div>
      )}

      <input
        type={type}
        className="min-w-0 flex-1 border-none bg-transparent outline-none placeholder:text-muted-foreground"
        ref={ref}
        {...rest}
      />

      {(hasEndIcon || endAction) && (
        <div className="ms-2 flex items-center gap-2">
          {endAction}
          {hasEndIcon && iconElement}
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export { Input }
