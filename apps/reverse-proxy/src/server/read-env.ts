import chalk from 'chalk'
import { existsSync } from 'fs'
import { config as configDotenv } from 'dotenv'
import { cleanEnv, host, port, str } from 'envalid'

const nodeEnv = process.env.NODE_ENV ?? 'local'
const dotenvFile = `.env.${nodeEnv}`
const dotenvPath = `./${dotenvFile}`

if (!existsSync(dotenvPath)) {
  throw new Error(`❌ Environment file not found: ${dotenvPath}`)
}

configDotenv({ path: dotenvPath })

const env = cleanEnv(process.env, {
  PROXY_TARGET: str(),
  HOST: host({ default: 'localhost' }),
  PORT: port(),
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
})

Object.assign(process.env, env)

console.log(chalk.italic(`~ using environment file ${dotenvFile}`))
