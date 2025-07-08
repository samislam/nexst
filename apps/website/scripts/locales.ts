import { concat } from 'concat-str'
import { runCommand } from '@clscripts/cl-common'
import { select, confirm } from '@inquirer/prompts'
import { TolgeeCli, TolgeeRunMode } from '@clscripts/tolgee-cli'

async function main() {
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
    new TolgeeCli({
      mode,
      removeUnused,
    }).command
  )
}
main()
