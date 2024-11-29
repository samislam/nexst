import { DataSourceOptions } from 'typeorm'

interface UserEnvironmentVars {
  /** Service host @default "localhost" @example "192.168.1.118" */
  HOST: string
  /** Service port @default 3001 @example 5000 */
  PORT: number
  // -----------DATABASE------------
  /**
   * The database host @default "localhost"
   *
   * @example
   *   - "localhost"
   *   - "94.77.145.221
   */
  DATABASE_HOST: string
  /** The database port @default 3306 */
  DATABASE_PORT: number
  /** The database name */
  DATABASE_NAME: string
  /**
   * Database user to access the database with. The user should have all the permissions on the
   * {DATABASE_NAME} database
   */
  DATABASE_USERNAME: string
  /** Database password */
  DATABASE_PASSWORD: string
}
interface PrivateEnvironmentVars {
  _TYPEORM_ENV: DataSourceOptions
}

export interface EnvironmentVars extends UserEnvironmentVars, PrivateEnvironmentVars {}
