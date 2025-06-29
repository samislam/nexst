import { Executable } from '@/types/executable-class'

export interface EslintOpts {
  scanPath: string
  fix?: boolean
  ext?: string[]
}
export class Eslint implements Executable {
  packageExecutable = 'eslint'
  scanPath: string
  fix?: boolean
  ext?: string[]
  constructor(opts: EslintOpts) {
    this.scanPath = opts.scanPath
    this.fix = opts.fix
    this.ext = opts.ext
  }
  get command() {
    return [this.packageExecutable, this.scanPathArg, this.extArgs, this.fixArg]
      .filter(Boolean)
      .join(' ')
  }
  get extArgs() {
    if (!this.ext) return ''
    else this.ext.map((ext) => `--ext ${ext}`).join(' ')
  }
  get fixArg() {
    return this.fix ? '--fix' : ''
  }
  get scanPathArg() {
    return this.scanPath
  }
}
