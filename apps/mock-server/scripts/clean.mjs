import { Del, runCommand } from '@repo/scripts'

runCommand(new Del({ files: ['**/{node_modules,dist,.turbo}'] }).command)
