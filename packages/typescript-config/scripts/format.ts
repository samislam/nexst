import { Prettier } from '@clscripts/prettier'
import { runCommand } from '@clscripts/cl-common'

runCommand(
  new Prettier({
    files: ['./*.json'],
  }).command
)
