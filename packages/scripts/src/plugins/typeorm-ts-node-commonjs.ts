import { Executable } from '@/types/executable-class'

export interface TypeORMOpts {
  dataSrcFile: string
  migrationsDir: string
  mode: TypeORMRunMode
  migrationName: string
}
export class TypeORM implements Executable {
  packageExecutable = 'typeorm-ts-node-commonjs'
  dataSrcFile: string
  migrationsDir: string
  migrationName: string
  mode: TypeORMRunMode
  constructor(opts: TypeORMOpts) {
    this.mode = opts.mode
    this.dataSrcFile = opts.dataSrcFile
    this.migrationsDir = opts.migrationsDir
    this.migrationName = opts.migrationName
  }
  get command() {
    return [this.packageExecutable, this.modeArg, this.dataSrcFileArg].filter(Boolean).join(' ')
  }
  get modeArg() {
    switch (this.mode) {
      case 'migration:generate':
        return `${this.mode} ${this.migrationsDir}/${this.migrationName}`
      default:
        return this.mode
    }
  }
  get dataSrcFileArg() {
    return `-d ${this.dataSrcFile}`
  }
}

export type TypeORMRunMode =
  | 'migration:generate'
  | 'migration:run'
  | 'migration:revert'
  | 'migration:show'
