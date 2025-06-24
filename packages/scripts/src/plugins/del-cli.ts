import { Executable } from '@/types/executable-class'

export interface DelOpts {
  files: string[]
}
export class Del implements Executable {
  packageExecutable = 'del'
  files: string[]
  constructor(opts: DelOpts) {
    this.files = opts.files
  }
  get command() {
    return [this.packageExecutable, this.filesArg].filter(Boolean).join(' ')
  }
  get filesArg() {
    return this.files
  }
}
