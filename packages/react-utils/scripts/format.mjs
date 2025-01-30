import { Prettier, runCommandsSequentially } from '@repo/scripts'

runCommandsSequentially([
  new Prettier({
    files: ['**/*.{ts,tsx,md,js}'],
    ignore: ['./dist'],
  }).command,
])
