import { Executable } from '@/types/executable-class'

export interface EslintOpts {
  scanPath: string
  fix?: boolean
}
export class Eslint implements Executable {
  packageExecutable = 'eslint'
  scanPath: string
  fix?: boolean
  constructor(opts: EslintOpts) {
    this.scanPath = opts.scanPath
    this.fix = opts.fix
  }
  get command() {
    return [this.packageExecutable, this.scanPathArg, this.fixArg].filter(Boolean).join(' ')
  }
  get fixArg() {
    return this.fix ? '--fix' : ''
  }
  get scanPathArg() {
    return this.scanPath
  }
}
