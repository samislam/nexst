import chalk from 'chalk'
import { Next } from '@clscripts/next'
import { TsPatch } from '@clscripts/ts-patch'
import { EchoCli } from '@clscripts/echo-cli'
import { DotenvCli } from '@clscripts/dotenv-cli'
import { runCommandsSequentially } from '@clscripts/cl-common'

runCommandsSequentially([
  new DotenvCli({
    envFile: '.env.production',
    execute: new Next({ mode: 'build' }).command,
  }).command,

  new EchoCli({
    message: chalk.bold.cyanBright.italic('~ Building scripts...'),
  }).command,

  new TsPatch({
    tsconfigPath: './scripts.tsconfig.json',
  }).command,

  new EchoCli({
    message: chalk.greenBright('✔ Building scripts completed'),
  }).command,

  new EchoCli({
    message: chalk.greenBright('✔ Building project succeeded!'),
  }).command,
])
