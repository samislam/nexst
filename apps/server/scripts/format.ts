import chalk from 'chalk'
import { EchoCli } from '@clscripts/echo-cli'
import { Prettier } from '@clscripts/prettier'
import { runCommandsSequentially } from '@clscripts/cl-common'

runCommandsSequentially([
  new EchoCli({ message: `Formatting ${chalk.bold('server')}` }).command,
  new Prettier({
    files: ['./src/**/*.{ts,js}', './test/**/*.{ts,js}'],
  }).command,
])
