import chalk from 'chalk'
import { Echo, Tspc } from '@repo/scripts'
import { runCommandsSequentially } from '@repo/scripts'

runCommandsSequentially([
  new Echo(chalk.cyanBright('info') + ' Compiling TypeScript...').command,
  new Tspc({ tsconfigPath: './tsconfig.build.json' }).command,
  new Echo(chalk.greenBright('Done') + ' Ready to use!').command,
])
