import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { ButtonProps, buttonVariants } from './button'
import { cn, LibIcon, LibIconProps, LibraryIcon, Loading, LoadingProps } from '@repo/react-utils'

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
  loadingText?: string
  idleIcon?: LibraryIcon
  loaderProps?: LoadingProps
  idleIconProps?: LibIconProps
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (props, ref) => {
    const {
      size,
      variant,
      loading,
      children,
      idleIcon,
      className,
      loaderProps,
      loadingText,
      idleIconProps,
      asChild = false,
      disabled,
      ...rest
    } = props
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        disabled={loading || disabled}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...rest}
      >
        {loading && loadingText ? loadingText : children}
        {loading && <Loading {...loaderProps} />}
        {!loading && idleIcon && <LibIcon icon={idleIcon} {...idleIconProps} />}
      </Comp>
    )
  }
)

LoadingButton.displayName = 'LoadingButton'
