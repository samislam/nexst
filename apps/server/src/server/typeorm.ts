import 'module-alias/register'
import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { registerAs } from '@nestjs/config'
import type { DataSourceOptions } from 'typeorm'
import { validateEnv } from '@/utils/validate-env'
import TypeORMEntities from '@/server/typeorm-entities'
import environmentSchema from '@/server/environment-schema'

const config = dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
if (!config.parsed) throw new Error('Failed to load environment variables')

export const AppDataSourceOptions: Partial<DataSourceOptions> = {
  synchronize: false,
  migrations: [`${__dirname}/../../migrations/*.ts`],
}

switch (process.env.NODE_ENV) {
  case 'development': {
    const env = validateEnv(environmentSchema)
    Object.assign(AppDataSourceOptions, {
      type: 'mysql',
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      database: env.DATABASE_NAME,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      entities: TypeORMEntities,
      synchronize: true,
    } satisfies DataSourceOptions)

    break
  }
  case 'test': {
    console.log('Testing environment is not supported yet! coming soon..')
    process.exit(-1)
  }
  case 'production':
    const env = validateEnv(environmentSchema)
    Object.assign(AppDataSourceOptions, {
      type: 'mysql',
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      database: env.DATABASE_NAME,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      entities: TypeORMEntities,
      synchronize: false,
    } satisfies DataSourceOptions)
    break
  default:
    console.log('Unknown environment, please specify the environment using NODE_ENV')
    process.exit(-1)
}
export default registerAs('_TYPEORM_ENV', () => AppDataSourceOptions)
export const AppDataSource = new DataSource(AppDataSourceOptions as DataSourceOptions)
