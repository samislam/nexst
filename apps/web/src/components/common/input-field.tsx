import { ReactNode } from 'react'
import { FormItem, FormLabel, FormMessage } from '../ui/form'
import { FormControl, FormDescription, FormField } from '../ui/form'
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

export interface InputFieldProps<T extends FieldValues, N extends Path<T>> {
  name: N
  label?: string
  description?: string
  control?: Control<T, unknown>
  render: (field: ControllerRenderProps<T, N>) => ReactNode
}

export const InputField = <T extends FieldValues, N extends Path<T>>(
  props: InputFieldProps<T, N>
) => {
  const { control, render, description, label, name } = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{render(field)}</FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}