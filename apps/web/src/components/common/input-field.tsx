import { ReactNode } from 'react'
import { FormItem, FormLabel, FormMessage } from '../ui/form'
import { FormControl, FormDescription, FormField } from '../ui/form'
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form'

/**
 * An abstraction component to simplify shadcnui controlled form components.
 *
 * Props for {@link InputField}.
 *
 * @template T - React Hook Form field values object.
 * @template N - Path within {@link T} (i.e., the form field name).
 *
 *   The component exposes stable `data-slot` attributes for parent styling:
 *
 *   - `data-slot="root" | "label" | "control" | "description" | "message"` It also toggles:
 *   - `data-has-error="true"` on the root when an error is present
 *   - `data-required="true"` on the label when the field is required
 */
export interface InputFieldProps<T extends FieldValues, N extends Path<T>> {
  /** Field name (RHF path) */
  name: N
  /** Label text rendered before the control */
  label?: string
  /** Optional className applied to the root FormItem */
  className?: string
  /** Marks the field as required (also passed to the `render` prop) */
  required?: boolean
  /** Error message shown under the control (also toggles `data-has-error`) */
  errorMessage?: string
  /** Helper/description content rendered under the control */
  description?: ReactNode
  /**
   * Custom node rendered next to the label when `required` is true. Defaults to `' *'`. Consider
   * moving the asterisk to CSS via `[data-slot="label"][data-required="true"]::after { content: "
   * *"; }` if you prefer a purely-CSS approach.
   */
  requiredSlot?: ReactNode
  /** React Hook Form control instance */
  control?: Control<T, unknown>
  /**
   * Render prop that receives RHF controller field props for this input (spread these onto your
   * input) plus a `required` flag.
   */
  render: (field: ControllerRenderProps<T, N> & { required?: boolean }) => ReactNode
}

/**
 * A small wrapper around shadcn/ui form primitives + RHF that renders a label, control,
 * description, and message with stable slots for parent styling.
 *
 * Slots (useful for parent selectors):
 *
 * - `data-slot="root" | "label" | "control" | "description" | "message"` State flags:
 * - `data-has-error` on the root when `errorMessage` is provided
 * - `data-required` on the label when `required` is true
 *
 * @example
 *   Parent styling (Tailwind)
 *   ```tsx
 *   <div className="
 *   [&_[data-slot=label]]:text-slate-700
 *   [&_[data-has-error=true]_[data-slot=label]]:text-red-600
 *   ">
 *   <InputField
 *   name="email"
 *   label="Email"
 *   required
 *   control={control}
 *   render={(field) => <Input type="email" {...field} />}
 *   />
 *   </div>
 *   ```
 */
export const InputField = <T extends FieldValues, N extends Path<T>>(
  props: InputFieldProps<T, N>
) => {
  const {
    name,
    label,
    render,
    control,
    required,
    className,
    description,
    errorMessage,
    requiredSlot = ' *',
  } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          data-slot="root"
          data-has-error={errorMessage ? true : undefined}
          className={className}
        >
          <FormLabel
            data-slot="label"
            data-required={required ? true : undefined}
            className="flex gap-x-1"
          >
            {label}
            {required && (
              <span aria-hidden className="text-red-500">
                {requiredSlot}
              </span>
            )}
          </FormLabel>

          <FormControl data-slot="control">{render({ ...field, required })}</FormControl>

          {description ? (
            <FormDescription data-slot="description">{description}</FormDescription>
          ) : null}

          <FormMessage data-slot="message">{errorMessage}</FormMessage>
        </FormItem>
      )}
    />
  )
}
