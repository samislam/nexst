import { Executable } from '@/types/executable-class'

export interface TolgeeOpts {
  mode: TolgeeRunMode
  removeUnused?: boolean
}
export class Tolgee implements Executable {
  packageExecutable = 'tolgee'
  mode: TolgeeRunMode
  deleteUnused?: boolean
  constructor(opts: TolgeeOpts) {
    this.mode = opts.mode
    this.deleteUnused = opts.removeUnused
  }
  get command() {
    return [this.packageExecutable, this.modeArg, this.deleteUnusedArg].filter(Boolean).join(' ')
  }
  get modeArg() {
    return this.mode
  }
  get deleteUnusedArg() {
    return this.deleteUnused ? `--remove-unused` : ''
  }
}

export type TolgeeRunMode = 'sync' | 'pull' | 'push' | 'print' | 'compare'
