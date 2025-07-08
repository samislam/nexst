import { CrossEnv } from '@clscripts/cross-env'
import { runCommand } from '@clscripts/cl-common'

runCommand(
  new CrossEnv({
    variables: { NODE_ENV: 'production' },
    execute: 'node ./dist/main.js',
  }).command
)
