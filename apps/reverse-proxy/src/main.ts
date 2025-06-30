import './server/read-env'
import * as chalk from 'chalk'
import * as express from 'express'
import { applicationRouter } from './routing'

const { HOST, PORT, PROXY_TARGET } = process.env

const app = express()

app.use('/', applicationRouter)

app.listen(PORT, HOST, () => {
  const publicUrl = `http://${HOST}:${PORT}`
  console.log('')
  console.log(`Service is listening on: ${chalk.underline(publicUrl)}`)
  console.log(`Proxy Target: ${chalk.bold.magentaBright.underline(PROXY_TARGET)}`)
  console.log(chalk.bold.greenBright('Proxying is now active'))
})
