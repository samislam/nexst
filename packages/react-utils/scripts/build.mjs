import chalk from 'chalk'
import { Barrel } from '@repo/scripts'
import { Echo, Tspc } from '@repo/scripts'
import { runCommandsSequentially, Tailwindcss } from '@repo/scripts'

runCommandsSequentially([
  new Echo(chalk.cyanBright('info') + ' Running Barrelsby...').command,

  new Barrel({
    directory: './src',
    delete: true,
    name: 'exports.ts',
    exclude: ['index.ts'],
  }).command,

  new Echo(chalk.cyanBright('info') + ' Compiling TypeScript...').command,

  new Tspc({
    tsconfigPath: './tsconfig.app.json',
  }).command,

  new Echo(chalk.cyanBright('info') + ' Compailing tailwind...').command,

  new Tailwindcss({
    ignore: ['./src/styles.css'],
    outputFilePath: './dist/styles.css',
    minify: true,
  }).command,

  new Echo(chalk.greenBright('Done') + ' Ready to use!').command,
])
