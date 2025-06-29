import { ObjectSchema } from 'joi'

export const validateEnv = <T>(schema: ObjectSchema<T>) => {
  const validationResult = schema.validate(process.env, {
    abortEarly: false,
    allowUnknown: true,
  })
  switch (true) {
    case !!validationResult.error:
      console.log('Error loading environment variables:')
      console.log(validationResult.error.details.map((err) => `* ${err.message}`).join('\n'))
      process.exit(-1)
      break
    default:
      return validationResult.value
  }
}
