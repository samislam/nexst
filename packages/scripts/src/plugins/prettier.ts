import { Executable } from '@/types/executable-class'

export interface PrettierOpts {
  files: string[]
  ignore?: string[]
}
export class Prettier implements Executable {
  packageExecutable = 'prettier'
  files: string[]
  ignore?: string[]
  constructor(opts: PrettierOpts) {
    this.files = opts.files
    this.ignore = opts.ignore
  }
  get command() {
    return [this.packageExecutable, this.fileArg, this.ignoreArg].filter(Boolean).join(' ')
  }
  get fileArg() {
    return `--write ${this.files.join(' ')}`
  }
  get ignoreArg() {
    return this.ignore ? `${this.ignore.map((path) => `!${path}`).join(' ')}` : ''
  }
}
