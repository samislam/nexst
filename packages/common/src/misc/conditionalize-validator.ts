import { registerDecorator } from 'class-validator'
import type { ValidationOptions, ValidationArguments } from 'class-validator'

/**
 * Creates a conditional validation decorator that applies a constraint only if a specified
 * condition is met.
 *
 * @example
 *   ```typescript
 *   const IsStringIf = conditionalizeValidator(
 *   'isStringIf',
 *   ({ value }) => typeof value === 'string',
 *   () => `$property must be a string`
 *   );
 *
 *   class ExampleClass {
 *   @IsStringIf((obj) => obj.someCondition)
 *   someProperty: string;
 *   }
 *   ```
 *
 * @template Z - Type of the optional user argument.
 * @param {string} name - The name of the custom validation.
 * @param {(args: ValidationArguments, userArg: Z) => boolean} constraint - The constraint function
 *   that determines validity.
 * @param {(args: ValidationArguments, userArg: Z) => string} defaultMessage - Function to generate
 *   the default error message.
 * @returns {<T extends object = object, Y extends keyof T = keyof T>(
 *   condition: (object: T, value: T[Y]) => boolean | void,
 *   userArg?: Z,
 *   validationOptions?: ValidationOptions
 * ) => PropertyDecorator}
 *   A function that creates a property decorator based on the condition.
 */
export const conditionalizeValidator =
  <Z = unknown>(
    name: string,
    constraint: (args: ValidationArguments, userArg: Z) => boolean,
    defaultMessage: (args: ValidationArguments, userArg: Z) => string
  ) =>
  <T extends object = object, Y extends keyof T = keyof T>(
    condition: (object: T, value: T[Y]) => boolean | void,
    userArg?: Z,
    validationOptions?: ValidationOptions
  ): PropertyDecorator => {
    return (object, propertyName: string | symbol) => {
      registerDecorator({
        name,
        target: object.constructor,
        propertyName: propertyName as string,
        options: validationOptions,
        validator: {
          validate(value: unknown, args: ValidationArguments): boolean {
            const runConstraint = condition(args.object as T, value as T[Y])
            return runConstraint ? constraint(args, userArg as Z) : true
          },
          defaultMessage(validationArguments: ValidationArguments): string {
            return defaultMessage(validationArguments, userArg as Z)
          },
        },
      })
    }
  }
