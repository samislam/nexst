import { Next } from '@clscripts/next'
import { DotenvCli } from '@clscripts/dotenv-cli'
import { runCommandsSequentially } from '@clscripts/cl-common'

runCommandsSequentially([
  new DotenvCli({
    envFile: '.env.production',
    execute: new Next({ mode: 'start' }).command,
  }).command,
])
