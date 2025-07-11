import chalk from 'chalk'
import { existsSync } from 'fs'
import { concat } from 'concat-str'
import { runCommand } from '@clscripts/cl-common'
import { DotenvCli } from '@clscripts/dotenv-cli'
import { select, confirm } from '@inquirer/prompts'
import { TolgeeCli, TolgeeRunMode } from '@clscripts/tolgee-cli'

async function main() {
  const nodeEnv = process.env.NODE_ENV ?? 'development'
  const possibleEnvFiles = [`.env.${nodeEnv}.local`, '.env.local', `.env.${nodeEnv}`, '.env']
  const dotenvFile = possibleEnvFiles.find((file) => existsSync(file))
  if (!dotenvFile) {
    console.error("You don't have any environment file specified, please define one first!")
    process.exit(-1)
  }
  console.log(chalk.cyanBright('Using environment file: '), chalk.bold.greenBright(dotenvFile))

  const mode = await select<TolgeeRunMode>({
    message: 'Choose an operation for the Tolgee-cli to execute:',
    choices: [
      {
        name: 'Push locales',
        value: 'push',
        description: 'Pushes translations to Tolgee',
      },
      {
        name: 'Pull locales',
        value: 'pull',
        description: 'Pulls translations from Tolgee',
      },
      {
        name: 'Compare locales',
        value: 'compare',
        description: 'Compares the keys in your code project and in the Tolgee project.',
      },
      {
        name: 'Sync locales',
        value: 'sync',
        description: concat(
          'Synchronizes the keys in your code project and in the Tolgee project,',
          'by creating missing keys and optionally'
        ),
      },
    ],
  })

  let removeUnused = false
  if (mode === 'sync') {
    removeUnused = await confirm({
      default: false,
      message: 'Would you like to automatically remove the unused keys from the cloud?',
    })
  }

  runCommand(
    new DotenvCli({
      envFile: dotenvFile,
      execute: new TolgeeCli({
        mode,
        removeUnused,
      }).command,
    }).command
  )
}
main()
