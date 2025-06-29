import { Transform, type TransformOptions } from 'class-transformer'
import { type ValidationOptions, ValidateIf } from 'class-validator'

/**
 * Sets all the validation rules to off and excludes (transforms) the property from the resulting
 * object.
 */
export const ExcludeIf =
  <T extends object = object, Y extends keyof T = keyof T>(
    condition: (object: T, value: T[Y]) => boolean | void,
    options: ExcludeIfOptions = {}
  ): PropertyDecorator =>
  (target: object, propertyKey: string | symbol) => {
    ValidateIf((object: T, value: T[Y]) => {
      const doIt = !!condition(object, value)
      return !doIt
    }, options.validationOptions)(target, propertyKey)

    Transform(
      (params) => {
        const doIt = !!condition(params.obj as T, params.value as T[Y])
        // ! this will not remove it from the class instance; you need to omit it by { exposeUnsetFields: false }
        if (doIt) return undefined
        return params.value
      },
      { toClassOnly: true, ...options.transformOptions }
    )(target, propertyKey)
  }

export interface ExcludeIfOptions {
  validationOptions?: ValidationOptions
  transformOptions?: TransformOptions
}
