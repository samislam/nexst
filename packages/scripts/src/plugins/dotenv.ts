import { Executable } from '@/types/executable-class'

export interface DotenvOpts {
  envFile: string
  execute: string
}
export class Dotenv implements Executable {
  packageExecutable = 'dotenv'
  envFile: string
  execute: string

  constructor(opts: DotenvOpts) {
    this.envFile = opts.envFile
    this.execute = opts.execute
  }

  get command() {
    return [this.packageExecutable, this.envFileArg, this.executeArg].filter(Boolean).join(' ')
  }
  get envFileArg() {
    return `-e ${this.envFile}`
  }
  get executeArg() {
    return `-- ${this.execute}`
  }
}
