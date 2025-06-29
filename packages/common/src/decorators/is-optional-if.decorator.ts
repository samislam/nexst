import { ValidateIf, type ValidationOptions } from 'class-validator'

/** Same as `@Optional()` decorator of class-validator, but adds a conditional layer on top of it */
export function IsOptionalIf<T extends object = object, Y extends keyof T = keyof T>(
  condition: (object: T, value: T[Y]) => boolean | void,
  options: ValidationOptions & OptionalIfOptions = {}
): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    const { allowNull = true, allowUndefined = true, ...validationOptions } = options

    ValidateIf((object: T, value: T[Y]): boolean => {
      const isOptional = Boolean(condition(object, value))

      const propValue = object[propertyKey as Y]
      const isNull = propValue === null
      const isUndefined = propValue === undefined

      let isDefined = !(isNull || isUndefined)

      if (!allowNull && allowUndefined) isDefined = !isUndefined
      if (!allowUndefined && allowNull) isDefined = !isNull

      const isRequired = isOptional && !isDefined ? false : true
      return isRequired
    }, validationOptions)(target, propertyKey)
  }
}

export interface OptionalIfOptions {
  allowNull?: boolean
  allowUndefined?: boolean
}
