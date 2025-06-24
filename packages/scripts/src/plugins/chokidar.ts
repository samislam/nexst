import { Executable } from '@/types/executable-class'

export interface ChokidarOpts {
  watchDir: string
  exclude: string[]
  onChange: string
}

export class Chokidar implements Executable {
  packageExecutable = 'chokidar'
  watchDir: string
  exclude: string[]
  onChange: string
  constructor(opts: ChokidarOpts) {
    this.watchDir = `'${opts.watchDir}'`
    this.exclude = opts.exclude
    this.onChange = opts.onChange
  }
  get command(): string {
    return [this.packageExecutable, this.watchDir, this.excludeArgs, this.onChangeArg]
      .filter(Boolean)
      .join(' ')
  }
  get excludeArgs() {
    return this.exclude.map((path) => `-i \'${path}\'`).join(' ')
  }
  get onChangeArg() {
    return `-c \'${this.onChange}\'`
  }
}
