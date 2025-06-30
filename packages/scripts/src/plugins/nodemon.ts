import { Executable } from '@/types/executable-class'

export interface NodemonOpts {
  watchPaths?: string[]
  ignorePaths?: string[]
  ext?: string
  exec?: string
  clear?: boolean
}

export class Nodemon implements Executable {
  packageExecutable = 'nodemon'
  watchPaths?: string[]
  ignorePaths?: string[]
  ext?: string
  exec?: string
  clear?: boolean

  constructor(opts: NodemonOpts = {}) {
    this.watchPaths = opts.watchPaths
    this.ignorePaths = opts.ignorePaths
    this.ext = opts.ext
    this.exec = opts.exec
    this.clear = opts.clear
  }

  get watchArgs() {
    return this.watchPaths?.length ? this.watchPaths.map((path) => `--watch ${path}`).join(' ') : ''
  }

  get ignoreArgs() {
    return this.ignorePaths?.length
      ? this.ignorePaths.map((path) => `--ignore ${path}`).join(' ')
      : ''
  }

  get extArg() {
    return this.ext ? `--ext ${this.ext}` : ''
  }

  get execArg() {
    if (!this.exec) return ''
    return this.clear ? `--exec 'clear && ${this.exec}'` : `--exec '${this.exec}'`
  }

  get command() {
    return [this.packageExecutable, this.watchArgs, this.ignoreArgs, this.extArg, this.execArg]
      .filter(Boolean)
      .join(' ')
  }
}
