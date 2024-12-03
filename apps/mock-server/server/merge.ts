import fs from 'fs'
import path from 'path'
import JSON5 from 'json5'

// Define the directory containing the JSON5 files
const dataDir: string = path.join(__dirname, '..', 'data')

// Interface for the database structure
interface Database {
  [key: string]: any
}

// Object to hold the combined data
const db: Database = {}

// Function to load and parse JSON5 files
const loadData = (filePath: string): any => {
  try {
    const fileContents: string = fs.readFileSync(filePath, 'utf-8')
    return JSON5.parse(fileContents)
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error)
    return null
  }
}

// ensure the data directory exists
fs.mkdirSync(dataDir, { recursive: true })

// Read each file in the data directory
fs.readdirSync(dataDir).forEach((file: string) => {
  if (file.endsWith('.json5')) {
    const filePath: string = path.join(dataDir, file)
    const dataKey: string = file.replace('.json5', '') // Use the filename as the key
    const data = loadData(filePath)
    if (data !== null) {
      db[dataKey] = data // Add parsed content to db object
    }
  }
})

// Write the combined data to db.json
const outputPath = path.join(__dirname, 'db.json')
if (!fs.existsSync(outputPath)) fs.writeFileSync(outputPath, '{}', 'utf8')
fs.writeFileSync(outputPath, JSON.stringify(db, null, 2))
console.log('Merged JSON5 files into db.json successfully!')
