import { Executable } from '@/types/executable-class'

export interface TsNodeDevOpts {
  tsconfigPath?: string
  entryFile: string
  respawn?: boolean
  clear?: boolean
  transpileOnly?: boolean
}

export class TsNodeDev implements Executable {
  packageExecutable = 'ts-node-dev'
  tsconfigPath?: string
  entryFile: string
  respawn?: boolean
  clear?: boolean
  transpileOnly?: boolean

  constructor(opts: TsNodeDevOpts) {
    this.tsconfigPath = opts.tsconfigPath
    this.entryFile = opts.entryFile
    this.respawn = opts.respawn
    this.clear = opts.clear
    this.transpileOnly = opts.transpileOnly
  }

  get tsconfigPathArg() {
    return this.tsconfigPath ? `--project ${this.tsconfigPath}` : ''
  }

  get entryFileArg() {
    return this.entryFile
  }

  get respawnArg() {
    return this.respawn ? '--respawn' : ''
  }

  get clearArg() {
    return this.clear ? '--clear' : ''
  }

  get transpileOnlyArg() {
    return this.transpileOnly ? '--transpile-only' : ''
  }

  get command() {
    return [
      this.packageExecutable,
      this.tsconfigPathArg,
      this.respawnArg,
      this.clearArg,
      this.transpileOnlyArg,
      this.entryFileArg,
    ]
      .filter(Boolean)
      .join(' ')
  }
}
