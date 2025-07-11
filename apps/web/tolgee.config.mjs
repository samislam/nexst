import { concat } from 'concat-str'

/**
 * Retrieves the Tolgee Project ID from the environment variables.
 *
 * @returns {string | undefined} The Tolgee Project ID if defined.
 */
const TOLGEE_PROJECT_ID = process.env.TOLGEE_PROJECT_ID
const TOLGEE_API_URL = process.env.NEXT_PUBLIC_TOLGEE_API_URL
const TOLGEE_API_KEY = process.env.NEXT_PUBLIC_TOLGEE_API_KEY

const checkRequiredEnvVariables = () => {
  // Check that all required environment variables are set
  if (!TOLGEE_PROJECT_ID) {
    console.error(
      concat(
        'TOLGEE_PROJECT_ID was not found in the environment variables.',
        'Please add it to your .env.local file or include it in your command and try again.'
      )
    )
    process.exit(1)
  }

  if (!TOLGEE_API_URL) {
    console.error(
      concat(
        'TOLGEE_API_URL was not found in the environment variables.',
        'Please add it to your .env.local file or include it in your command and try again.'
      )
    )
    process.exit(1)
  }

  if (!TOLGEE_API_KEY) {
    console.error(
      concat(
        'TOLGEE_API_KEY was not found in the environment variables.',
        'Please add it to your .env.local file or include it in your command and try again.'
      )
    )
    process.exit(1)
  }
}

// Check if the required environment variables are present
checkRequiredEnvVariables()

// Output the configuration (uncomment for debugging)
// console.table({
//   TOLGEE_PROJECT_ID: TOLGEE_PROJECT_ID(),
//   TOLGEE_API_URL: TOLGEE_API_URL(),
//   TOLGEE_API_KEY: TOLGEE_API_KEY(),
// })

export default {
  $schema: 'https://tolgee.io/cli-schema.json',
  apiUrl: TOLGEE_API_URL,
  apiKey: TOLGEE_API_KEY,
  format: 'JSON_TOLGEE',
  patterns: ['./src/**/*.ts?(x)'],
  extractor: './src/lib/tolgee/tolgee-extractor.mjs',
  pull: { path: './src/i18n' },
  push: {
    files: [
      { path: './src/i18n/en.json', language: 'en' },
      { path: './src/i18n/ar.json', language: 'ar' },
      { path: './src/i18n/tr.json', language: 'tr' },
      // add more languages as needed
    ],
    forceMode: 'OVERRIDE',
  },
  projectId: TOLGEE_PROJECT_ID,
}
