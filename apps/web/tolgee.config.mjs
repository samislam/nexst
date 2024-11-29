import dotenv from 'dotenv'

/**
 * Retrieves the Tolgee Project ID from the environment variables.
 *
 * @returns {string | undefined} The Tolgee Project ID if defined.
 */
const TOLGEE_PROJECT_ID = () => process.env.TOLGEE_PROJECT_ID

// Load environment variables if `TOLGEE_PROJECT_ID` is not set.
// This applies when the `tolgee` command is run directly from the command line
// and not from package.json scripts, which automatically load the .env.development file.
if (!TOLGEE_PROJECT_ID()) {
  dotenv.config({ path: `.env.development` })
}

// Check again for `TOLGEE_PROJECT_ID` after attempting to load environment variables.
if (!TOLGEE_PROJECT_ID()) {
  console.error(
    'TOLGEE_PROJECT_ID was not found in the environment variables. ' +
      'Please add it to your .env.development file or include it in your command and try again.'
  )
  process.exit(-1)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  $schema: 'https://tolgee.io/cli-schema.json',
  apiUrl: 'https://app.tolgee.io',
  format: 'JSON_TOLGEE',
  patterns: ['./src/**/*.ts?(x)'],
  extractor: './src/lib/tolgee/tolgee-extractor.mjs',
  pull: { path: './src/i18n' },
  push: {
    files: [
      {
        path: './src/i18n/en.json',
        language: 'en',
      },
      {
        path: './src/i18n/ar.json',
        language: 'ar',
      },
      {
        path: './src/i18n/tr.json',
        language: 'tr',
      },
      // add more languages as needed
    ],
    forceMode: 'OVERRIDE',
  },
  projectId: TOLGEE_PROJECT_ID(), // # uncomment and change this
}
