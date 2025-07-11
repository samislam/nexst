import { z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_TOLGEE_API_KEY: z.string(),
    NEXT_PUBLIC_TOLGEE_API_URL: z.string().url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_TOLGEE_API_KEY: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,
    NEXT_PUBLIC_TOLGEE_API_URL: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
  },
})
