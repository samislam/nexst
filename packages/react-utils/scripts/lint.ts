import chalk from 'chalk'
import { Eslint } from '@clscripts/eslint'
import { EchoCli } from '@clscripts/echo-cli'
import { TsPatch } from '@clscripts/ts-patch'
import { runCommandsSequentially } from '@clscripts/cl-common'

runCommandsSequentially([
  new EchoCli({
    message: chalk.bold.cyanBright.italic('~ Type checking your project...'),
  }).command,
  // type checking ---------
  new TsPatch({
    noEmit: true,
    tsconfigPath: './tsconfig.json',
  }).command,

  new EchoCli({
    message: chalk.greenBright('✔ No type errors were found'),
  }).command,

  new EchoCli({
    message: chalk.bold.cyanBright.italic('~ Eslint is now checking your project...'),
  }).command,

  // type checking ---------
  new Eslint({
    scanPath: '.',
    ext: ['.ts', '.tsx'],
  }).command,

  new EchoCli({
    message: chalk.bold.cyanBright.italic('~ You should be able to build your project now'),
  }).command,
])
