import { Prettier } from '@clscripts/prettier'
import { runCommand } from '@clscripts/cl-common'

runCommand(
  new Prettier({
    files: ['./**/*.{htm,html,css,md,mdx,js,jsx,ts,tsx}'],
  }).command
)
