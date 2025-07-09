import { Prettier } from '@clscripts/prettier'
import { runCommandsSequentially } from '@clscripts/cl-common'

runCommandsSequentially([
  new Prettier({
    files: ['**/*.{ts,tsx,md,js}'],
    ignore: ['./src/index.ts'],
  }).command,
])
