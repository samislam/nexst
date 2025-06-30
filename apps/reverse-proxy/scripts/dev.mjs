import { runCommand, TsNodeDev, Tspc, Concurrently, Nodemon, CrossEnv } from '@repo/scripts'

runCommand(
  new CrossEnv({
    variables: { FORCE_COLOR: 1, NODE_ENV: 'development' },
    execute: new Nodemon({
      clear: true,
      watchPaths: ['./src'],
      ignorePaths: ['./src/generated'],
      ext: 'ts,tsx',
      exec: new Concurrently({
        raw: true,
        names: ['ts-patch', 'ts-node-dev'],
        args: [
          new Tspc({
            noEmit: true,
            tsconfigPath: './tsconfig.json',
            watch: true,
            preserveWatchOutput: true,
          }).command,
          new TsNodeDev({
            tsconfigPath: './tsconfig.json',
            entryFile: './src/main.ts',
            respawn: true,
            clear: false,
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
