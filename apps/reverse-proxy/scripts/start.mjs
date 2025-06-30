import { CrossEnv, runCommand } from '@repo/scripts'

runCommand(
  new CrossEnv({
    variables: { NODE_ENV: 'production' },
    execute: 'node ./dist/main.js',
  }).command
)
