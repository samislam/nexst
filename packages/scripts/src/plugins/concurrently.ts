import { Executable } from '@/types/executable-class'

export interface ConcurrentlyOpts {
  names: string[]
  prefixColors: string[]
  args: string[]
  killOthers: boolean
  raw?: boolean
}

export class Concurrently implements Executable {
  names: string[]
  prefixColors: string[]
  args: string[]
  raw?: boolean
  packageExecutable = 'concurrently'

  constructor(opts: ConcurrentlyOpts) {
    this.names = opts.names
    this.prefixColors = opts.prefixColors
    this.args = opts.args
    this.raw = opts.raw
  }

  get command() {
    return [
      this.packageExecutable,
      this.namesArg,
      this.prefixColorsArg,
      this.rawArg,
      this.argsFields,
    ]
      .filter(Boolean)
      .join(' ')
  }

  get namesArg() {
    return `--names ${this.names.join(',')}`
  }

  get prefixColorsArg() {
    return this.prefixColors.length > 0 ? `--prefix-colors ${this.prefixColors.join(',')}` : ''
  }

  get argsFields(): string {
    return this.args.map((arg) => `"${arg}"`).join(' ')
  }

  get rawArg() {
    return this.raw ? '--raw' : ''
  }
}
