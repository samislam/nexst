import chalk from 'chalk'
import { Echo, Eslint, runCommandsSequentially, Tspc } from '@repo/scripts'

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
  new Eslint({
    scanPath: '{src,apps,libs,test}/**/*.ts',
    ext: ['.ts'],
  }).command,
  new Echo(chalk.bold.cyanBright.italic('~ You should be able to build your project now')).command,
])
