import { Executable } from '@/types/executable-class'

export interface PrismaOpts {
  mode: PrismaRunMode
  /** Used with migrate mode (--name) */
  migrationName?: string
  /** Used with the migrate mode (--create-only) */
  createOnly?: boolean
  /** Used with db push, not recommended for production (--force-reset) */
  forceReset?: boolean
  /** Used with studio */
  studioPort?: number
}
export class Prisma implements Executable {
  packageExecutable = 'prisma'
  mode: PrismaRunMode
  migrationName?: string
  createOnly?: boolean
  forceReset?: boolean
  studioPort?: number
  constructor(opts: PrismaOpts) {
    this.mode = opts.mode
    this.migrationName = opts.migrationName
    this.createOnly = opts.createOnly
    this.forceReset = opts.forceReset
    this.studioPort = opts.studioPort
  }
  get command() {
    return [this.packageExecutable, this.modeArg].filter(Boolean).join(' ')
  }
  get modeArg() {
    switch (this.mode) {
      case 'push':
        return [`db push`, this.forceResetArg].join(' ')
      case 'seed':
        return [`db seed`].join(' ')
      case 'migrate':
        return [`migrate dev`, this.migrationNameArg, this.createOnlyArg].join(' ')
      case 'deploy':
        return `migrate deploy`
      case 'studio':
        return [`studio`, this.studioPortArg].join(' ')
      default:
        return this.mode
    }
  }
  get migrationNameArg() {
    return this.migrationName ? `--name ${this.migrationName}` : ''
  }
  get createOnlyArg() {
    return this.createOnly ? `--create-only` : ''
  }
  get forceResetArg() {
    return this.forceReset ? `--force-reset` : ''
  }
  get studioPortArg() {
    return this.studioPort ? `--port ${this.studioPort}` : ''
  }
}

export type PrismaRunMode =
  | 'init' // Generates the prisma/schema.prisma file
  | 'generate' // Generates the Prisma Client for interacting with your database.
  | 'push' // Synchronizes your Prisma schema with the database (Does not generate migration files).
  | 'migrate' // Creates a new migration based on schema changes, and can apply the migration to the database
  | 'seed' // Populates your database with initial data
  | 'deploy' // Apply all pending migrations to a production database. (does not create new migration files or run seed scripts automatically).
  | 'validate' // Validates your schema.prisma file
  | 'studio' // Opens a web-based interface to view and edit data (Runs on localhost:5555 by default)
