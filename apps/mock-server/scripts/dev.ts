import { Tsx } from '@clscripts/tsx'
import { runCommand } from '@clscripts/cl-common'
import { JsonServer } from '@clscripts/json-server'
import { Concurrently } from '@clscripts/concurrently'

runCommand(
  new Concurrently({
    prefixColors: [],
    names: ['merge', 'json-server'],
    killOthers: false,
    args: [
      new Tsx({
        entryFile: './server/merge.ts',
        watch: true,
      }).command,
      new JsonServer({
        serveFrom: './server/db.json',
        port: 5500,
      }).command,
    ],
  }).command
)
