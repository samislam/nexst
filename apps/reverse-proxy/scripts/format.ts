import { runCommand } from '@clscripts/cl-common'
import { Prettier } from '@clscripts/prettier'

runCommand(
  new Prettier({
    files: ['**/*.{ts,tsx,md,js}'],
    ignore: ['./src/index.ts'],
  }).command
)
