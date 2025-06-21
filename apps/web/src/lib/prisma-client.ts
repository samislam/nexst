import { PrismaClient } from '@/generated/prisma'

export const prismaClient = new PrismaClient()

const globalForPrisma = global as unknown as { prisma: typeof prismaClient }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaClient
