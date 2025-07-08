import { CrossEnv } from '@clscripts/cross-env'
import { runCommand } from '@clscripts/cl-common'
import { NestjsCli } from '@clscripts/nestjs-cli'

runCommand(
  new CrossEnv({
    variables: {
      NODE_ENV: 'production',
    },
    execute: new NestjsCli({
      mode: 'build',
    }).command,
  }).command
)
