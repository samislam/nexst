import chalk from 'chalk'
import { concat } from 'concat-str'
import { stringToNumber } from '@repo/common'
import { DotenvCli } from '@clscripts/dotenv-cli'
import { runCommand } from '@clscripts/cl-common'
import { Prisma, PrismaRunMode } from '@clscripts/prisma'
import { select, confirm, input } from '@inquirer/prompts'

async function main() {
  // Read command-line arguments
  const args = process.argv.slice(2) // Ignore "node" and script filename
  let mode: PrismaRunMode = args[0] as PrismaRunMode // e.g., "migrate" or "studio"
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

  runCommand(
    new DotenvCli({
      envFile: '.env.development',
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
