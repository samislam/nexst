import { Executable } from '@/types/executable-class'

export interface CrossEnvOpts {
  variables: Record<string, string | number>
  execute: string
}
export class CrossEnv implements Executable {
  packageExecutable = 'cross-env'
  variables: Record<string, string | number>
  execute: string
  constructor(opts: CrossEnvOpts) {
    this.variables = opts.variables
    this.execute = opts.execute
  }
  get command() {
    return [this.packageExecutable, this.variablesArg, this.execute].filter(Boolean).join(' ')
  }
  get variablesArg() {
    const variablesSet = new Set()
    for (const [key, val] of Object.entries(this.variables)) {
      variablesSet.add(`${key}=${val}`)
    }
    return [...variablesSet].join(' ')
  }
  get executeArg() {
    return this.execute
  }
}
