import { Next } from '@clscripts/next'
import { DotenvCli } from '@clscripts/dotenv-cli'
import { runCommand } from '@clscripts/cl-common'

runCommand(
  new DotenvCli({
    envFile: '.env.production',
    execute: new Next({ mode: 'start' }).command,
  }).command
)
