import { Executable } from '@/types/executable-class'

export interface JsonServerOpts {
  serveFrom: string
  port: number
  watch?: boolean
}

export class JsonServer implements Executable {
  packageExecutable = 'json-server'
  serveFrom: string
  port: number
  watch: boolean

  constructor(opts: JsonServerOpts) {
    this.serveFrom = opts.serveFrom
    this.port = opts.port
    this.watch = opts.watch ?? false
  }

  get command() {
    return [
      this.packageExecutable,
      this.portArg,
      this.watchArg,
      this.serveFromArg, // <== JSON file path goes last
    ]
      .filter(Boolean)
      .join(' ')
  }

  get portArg() {
    return `--port ${this.port}`
  }

  get watchArg() {
    return this.watch ? '--watch' : ''
  }

  get serveFromArg() {
    return this.serveFrom
  }
}
