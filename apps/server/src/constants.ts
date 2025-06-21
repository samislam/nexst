export const REQUEST_USER = 'REQUEST_USER'

// # App error codes
export const UNKNOWN_ERR = 'UNKNOWN_ERR'
export const DUPLICATE_ERR = 'DUPLICATE_ERR'
export const REF_ERR = 'REF_ERR'

// # Prisma Error codes
export const PRISMA_DUPLICATE_ERR = 'P2002'
export const PRISMA_NOT_FOUND_ERR = 'P2025'
export const PRISMA_REF_ERR = 'P2003'

export const errorCodes = [
  UNKNOWN_ERR, //
  DUPLICATE_ERR,
  REF_ERR,
] as const

export type AppErrorCodes = (typeof errorCodes)[number]
