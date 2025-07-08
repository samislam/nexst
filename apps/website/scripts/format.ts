import { Prettier } from '@clscripts/prettier'
import { runCommandsSequentially } from '@clscripts/cl-common'

runCommandsSequentially([
  new Prettier({
    files: ['./**/*.{htm,html,css,md,mdx,js,jsx,ts,tsx}'],
  }).command,
])
