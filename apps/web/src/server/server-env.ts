import { z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

export const serverEnv = createEnv({
  server: {
    PORT: z.number().default(3000),
  },
  experimental__runtimeEnv: {
    PORT: process.env.PORT ? +process.env.PORT : undefined,
  },
})
