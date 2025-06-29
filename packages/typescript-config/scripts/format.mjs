import { Prettier, runCommandsSequentially } from '@repo/scripts'

runCommandsSequentially([
  new Prettier({
    files: ['./*.json'],
  }).command,
])
