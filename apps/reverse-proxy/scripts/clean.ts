import { DelCli } from '@clscripts/del-cli'
import { runCommandsSequentially } from '@clscripts/cl-common'

runCommandsSequentially([
  new DelCli({
    files: ['**/{node_modules,dist,.turbo}'],
  }).command,
])
