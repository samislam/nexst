import chalk from 'chalk'
import { existsSync } from 'fs'
import { Next } from '@clscripts/next'
import { DotenvCli } from '@clscripts/dotenv-cli'
import { runCommand } from '@clscripts/cl-common'

const possibleEnvFiles = [`.env.development.local`, `.env.development`, '.env.local', '.env']
const dotenvFile = possibleEnvFiles.find((file) => existsSync(file))
console.log(
  chalk.cyanBright('Using environment file: '),
  chalk.bold.greenBright(dotenvFile ?? 'None!')
)

const nextCommand = new Next({
  mode: 'dev',
  turbo: true,
}).command

const commandToRun = dotenvFile
  ? new DotenvCli({
      envFile: dotenvFile,
      execute: nextCommand,
    }).command
  : nextCommand

runCommand(commandToRun)
