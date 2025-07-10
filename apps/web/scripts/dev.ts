import { Next } from '@clscripts/next'
import { DotenvCli } from '@clscripts/dotenv-cli'
import { runCommand } from '@clscripts/cl-common'

runCommand(
  new DotenvCli({
    envFile: '.env.local',
    execute: new Next({ mode: 'dev', turbo: true }).command,
  }).command
)
