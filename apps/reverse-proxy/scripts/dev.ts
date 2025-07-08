import { TsNode } from '@clscripts/ts-node'
import { Nodemon } from '@clscripts/nodemon'
import { TsPatch } from '@clscripts/ts-patch'
import { CrossEnv } from '@clscripts/cross-env'
import { runCommand } from '@clscripts/cl-common'
import { Concurrently } from '@clscripts/concurrently'

runCommand(
  new CrossEnv({
    variables: { FORCE_COLOR: 1 },
    execute: new Nodemon({
      clear: true,
      watchPaths: ['./src'],
      ignorePaths: ['./src/index.ts'],
      ext: 'ts',
      exec: new Concurrently({
        raw: true,
        names: ['ts-patch', 'ts-node-dev', 'barrelsby'],
        args: [
          new TsPatch({
            noEmit: true,
            tsconfigPath: './tsconfig.json',
            watch: true,
            preserveWatchOutput: true,
          }).command,
          new TsNode({
            entryFile: './src/main.ts',
            projectPath: './tsconfig.json',
            transpileOnly: true,
          }).command,
        ],
        killOthers: false,
        prefixColors: ['green', 'blue'],
      }).command,
    }).command,
  }).command,
  true
)
