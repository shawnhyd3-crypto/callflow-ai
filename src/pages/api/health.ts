import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

type HealthResponse = {
  status: 'ok' | 'degraded'
  checks: {
    database: 'ok' | 'error'
  }
  dbError: string | null
  latencyMs: number
  timestamp: string
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  const startedAt = Date.now()
  let dbOk = false
  let dbError: string | null = null

  try {
    await prisma.$queryRaw`SELECT 1`
    dbOk = true
  } catch (error) {
    dbError = error instanceof Error ? error.message : 'Unknown database error'
  }

  const response: HealthResponse = {
    status: dbOk ? 'ok' : 'degraded',
    checks: {
      database: dbOk ? 'ok' : 'error',
    },
    dbError,
    latencyMs: Date.now() - startedAt,
    timestamp: new Date().toISOString(),
  }

  res.status(dbOk ? 200 : 503).json(response)
}
