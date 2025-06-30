import { Executable } from '@/types/executable-class'

export interface TspcOpts {
  tsconfigPath?: string
  watch?: boolean
  noEmit?: boolean
  preserveWatchOutput?: boolean
}

/** A script plugin for the `ts-patch` package */
export class Tspc implements Executable {
  packageExecutable = 'tspc'
  tsconfigPath?: string
  watch?: boolean
  noEmit?: boolean
  preserveWatchOutput?: boolean
  constructor(opts: TspcOpts = {}) {
    this.tsconfigPath = opts.tsconfigPath
    this.watch = opts.watch
    this.noEmit = opts.noEmit
    this.preserveWatchOutput = opts.preserveWatchOutput
  }
  get tsconfigPathArg() {
    return this.tsconfigPath ? `-p ${this.tsconfigPath}` : ''
  }
  get watchArg() {
    return this.watch ? `--watch` : ''
  }
  get noEmitArg() {
    return this.noEmit ? `--noEmit` : ''
  }
  get preserveWatchOutputArg() {
    return this.preserveWatchOutput ? '--preserveWatchOutput' : ''
  }
  get command() {
    return [
      this.packageExecutable,
      this.tsconfigPathArg,
      this.watchArg,
      this.noEmitArg,
      this.preserveWatchOutputArg,
    ]
      .filter(Boolean)
      .join(' ')
  }
}
