import { Executable } from '@/types/executable-class'

export interface NextOpts {
  mode: NextRunMode
  turbo?: boolean
}
export class Next implements Executable {
  packageExecutable = 'next'
  mode: NextRunMode
  turbo?: boolean
  constructor(opts: NextOpts) {
    this.mode = opts.mode
    this.turbo = opts.turbo
  }
  get command() {
    return [this.packageExecutable, this.modeArg, this.turboArg].filter(Boolean).join(' ')
  }
  get modeArg() {
    return this.mode
  }
  get turboArg() {
    return this.turbo ? '--turbo' : ''
  }
}

export type NextRunMode = 'start' | 'dev' | 'build' | 'lint'
