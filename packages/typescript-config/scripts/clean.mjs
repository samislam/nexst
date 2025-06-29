import { Del, runCommandsSequentially } from '@repo/scripts'

runCommandsSequentially([new Del({ files: ['**/{node_modules,.turbo}'] }).command])
