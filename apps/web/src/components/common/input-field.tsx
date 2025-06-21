import { ReactNode } from 'react'
import { FormItem, FormLabel, FormMessage } from '../ui/form'
import { FormControl, FormDescription, FormField } from '../ui/form'
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

export interface InputFieldProps<T extends FieldValues, N extends Path<T>> {
  name: N
  label?: string
  className?: string
  description?: string
  errorMessage?: string
  control?: Control<T, unknown>
  render: (field: ControllerRenderProps<T, N>) => ReactNode
}

export const InputField = <T extends FieldValues, N extends Path<T>>(
  props: InputFieldProps<T, N>
) => {
  const { control, render, description, label, name, errorMessage, className } = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>{render(field)}</FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage>{errorMessage}</FormMessage>
        </FormItem>
      )}
    />
  )
}
