import { Prisma } from '@clscripts/prisma'
import { runCommand } from '@clscripts/cl-common'
import { DotenvCli } from '@clscripts/dotenv-cli'

runCommand(
  new DotenvCli({
    envFile: '.env.local',
    execute: new Prisma({
      mode: 'generate',
    }).command,
  }).command
)
