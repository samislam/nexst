import { Echo, Next, runCommandsSequentially, Tspc } from '@repo/scripts'
import chalk from 'chalk'

runCommandsSequentially([
  new Echo(chalk.bold.cyanBright.italic('~ Type checking your project...')).command,
  // type checking ---------
  new Tspc({
    noEmit: true,
    tsconfigPath: './tsconfig.json',
  }).command,
  new Echo(chalk.greenBright('✔ No type errors were found')).command,
  new Echo(chalk.bold.cyanBright.italic('~ Eslint is now checking your project...')).command,
  // type checking ---------
  new Next({
    mode: 'lint',
  }).command,
  new Echo(chalk.bold.cyanBright.italic('~ You should be able to build your project now')).command,
])
