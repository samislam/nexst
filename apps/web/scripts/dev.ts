import { Next } from '@clscripts/next'
import { DotenvCli } from '@clscripts/dotenv-cli'
import { runCommandsSequentially } from '@clscripts/cl-common'

runCommandsSequentially([
  new DotenvCli({
    envFile: '.env.local',
    execute: new Next({ mode: 'dev', turbo: true }).command,
  }).command,
])
