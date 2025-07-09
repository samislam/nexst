import { Prettier } from '@clscripts/prettier'
import { runCommand } from '@clscripts/cl-common'

runCommand(
  new Prettier({
    files: ['**/*.{ts,tsx,md,js}'],
    ignore: ['./src/exports.ts'],
  }).command
)
