import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@prisma/adapter-pg'
import { Pool } from 'pg'

// In Prisma 7, the client needs an explicit adapter to connect to the database.
// We use @prisma/adapter-pg which wraps the standard PostgreSQL driver (pg).
// A Pool manages a group of database connections that are reused across requests,
// which is more efficient than opening a new connection every time.
function createPrismaClient(): PrismaClient {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaAdapter(pool)
  return new PrismaClient({ adapter })
}

// Prevent multiple Prisma client instances in development due to hot reloading.
// In production there's only one instance, but in dev Next.js re-runs this file
// on every change — so we attach a single instance to the global object.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
