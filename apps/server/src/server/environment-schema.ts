import * as Joi from 'joi'
import { EnvironmentVars } from '@/types/environment-vars'

export default Joi.object<EnvironmentVars>({
  HOST: Joi.string().default('localhost'),
  PORT: Joi.number().port().default(3001),
  // # Database authentication
  DATABASE_NAME: Joi.string(),
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_PORT: Joi.number().port().default(3306),
  DATABASE_USERNAME: Joi.string(),
  DATABASE_PASSWORD: Joi.string(),
})
