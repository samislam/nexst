import chalk from 'chalk'
import { concat } from 'concat-str'
import { stringToNumber } from '@repo/common'
import { select, confirm, input } from '@inquirer/prompts'
import { Del, Dotenv, Prisma, runCommand } from '@repo/scripts'

async function main() {
  // Read command-line arguments
  const args = process.argv.slice(2) // Ignore "node" and script filename
  /** @type {import('@repo/scripts').PrismaRunMode | 'clean'} */
  let mode = /** @type {any} */ (args[0]) // e.g., "migrate" or "studio"
  if (!mode)
    mode = await select({
      message: 'Choose an operation for the Prisma CLI to execute:',
      pageSize: 10,
      choices: [
        {
          name: 'Initialize',
          value: 'init',
          description: 'Generates the prisma/schema.prisma file',
        },
        {
          name: 'Generate prisma client',
          value: 'generate',
          description: 'Generates the Prisma Client for interacting with your database',
        },
        {
          name: 'Push changes',
          value: 'push',
          description: concat(
            'Synchronizes Prisma schema with the database',
            "(Doesn't generate migration files)"
          ),
        },
        {
          name: 'Migrate',
          value: 'migrate',
          description: concat(
            'Creates a new migration based on schema changes',
            'and can apply the migration to the database'
          ),
        },
        {
          name: 'Seed',
          value: 'seed',
          description: 'Populates your database with initial data',
        },
        {
          name: 'Deploy',
          value: 'deploy',
          description: concat(
            'Apply all pending migrations to a production database.',
            '(does not create new migration files or run seed scripts automatically)'
          ),
        },
        {
          name: 'Validate',
          value: 'validate',
          description: 'Validates your schema.prisma file',
        },
        {
          name: 'Clean',
          value: 'clean',
          description: 'Fixes issues when the generated client is corrupted',
        },
        {
          name: 'Studio',
          value: 'studio',
          description: 'Opens a web-based interface to view and edit data',
        },
      ],
    })

  let forceReset = false
  let createOnly = true
  let migrationName = ''
  let studioPort = 5555
  switch (mode) {
    case 'push':
      forceReset = await confirm({
        default: false,
        message: concat(
          'Run the force reset command?\n',
          chalk.bold.redBright(
            '🚧🔴 WARNING: this deletes your tables and re-creates them',
            'which causes your data to be deleted!'
          )
        ),
      })
      break
    case 'migrate':
      createOnly = await confirm({
        default: false,
        message: concat(
          'Would you like to run the generated migration',
          'and apply it to the database automatically?'
        ),
      })
      migrationName = await input({ message: 'Enter migration name' })
      break
    case 'studio':
      studioPort = stringToNumber(
        await input({
          default: studioPort.toString(),
          message: 'Port',
        })
      )
  }

  if (mode === 'clean') {
    console.log('Deleting node_modules/.prisma...')
    await runCommand(
      new Del({
        files: ['node_modules/.prisma', 'prisma/migrations', 'prisma/client'],
      }).command
    )
    mode = 'generate'
  }

  runCommand(
    new Dotenv({
      envFile: '.env.local',
      execute: new Prisma({
        mode,
        forceReset,
        createOnly,
        studioPort,
        migrationName,
      }).command,
    }).command
  )
}
main()
