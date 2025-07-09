import { Nodemon } from '@clscripts/nodemon'
import { TsPatch } from '@clscripts/ts-patch'
import { CrossEnv } from '@clscripts/cross-env'
import { Barrelsby } from '@clscripts/barrelsby'
import { Tailwindcss } from '@clscripts/tailwindcss'
import { Concurrently } from '@clscripts/concurrently'
import { runCommandsSequentially } from '@clscripts/cl-common'

const barrelCommand = new Barrelsby({
  directory: './src',
  delete: true,
  name: 'exports.ts',
  exclude: ['index.ts'],
}).command

runCommandsSequentially([
  barrelCommand,
  new CrossEnv({
    variables: { FORCE_COLOR: 1, NODE_ENV: 'development' },
    execute: new Nodemon({
      clear: true,
      watchPaths: ['./src'],
      ignorePaths: ['./src/exports.ts'],
      ext: 'ts',
      exec: new Concurrently({
        raw: true,
        killOthers: true,
        prefixColors: ['green', 'blue', 'pink'],
        names: ['ts-patch', 'ts-node-dev', 'barrelsby'],
        args: [
          barrelCommand,
          new TsPatch({
            watch: true,
            preserveWatchOutput: true,
            tsconfigPath: './tsconfig.build.json',
          }).command,
          new Tailwindcss({
            ignore: ['./src/styles.css'],
            outputFilePath: './dist/styles.css',
            watch: true,
          }).command,
        ],
      }).command,
    }).command,
  }).command,
])
