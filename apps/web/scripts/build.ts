import chalk from 'chalk'
import { existsSync } from 'fs'
import { Next } from '@clscripts/next'
import { TsPatch } from '@clscripts/ts-patch'
import { EchoCli } from '@clscripts/echo-cli'
import { DotenvCli } from '@clscripts/dotenv-cli'
import { runCommandsSequentially } from '@clscripts/cl-common'

const possibleEnvFiles = [`.env.production.local`, `.env.production`, '.env.local', '.env']
const dotenvFile = possibleEnvFiles.find((file) => existsSync(file))
console.log(
  chalk.cyanBright('Using environment file: '),
  chalk.bold.greenBright(dotenvFile ?? 'None!')
)

const nextCommand = new Next({ mode: 'build' }).command
runCommandsSequentially(
  [
    dotenvFile
      ? new DotenvCli({
          envFile: dotenvFile!,
          execute: nextCommand,
        }).command
      : nextCommand,

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
  ],
  true
)
