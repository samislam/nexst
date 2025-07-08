import fs from 'fs'
import path from 'path'
import { getGlobals } from 'common-es'

// Define the directory containing the JSON5 files
const { __dirname } = getGlobals(import.meta.url)
const dataDir = path.join(__dirname, '..', 'data')
const outputPath = path.join(__dirname, '..', 'server', 'db.json')
if (!fs.existsSync(outputPath)) fs.writeFileSync(outputPath, '{}', 'utf8')
// ensure the data directory exists
fs.mkdirSync(dataDir, { recursive: true })
