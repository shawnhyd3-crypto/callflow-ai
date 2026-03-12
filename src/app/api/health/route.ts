import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const startedAt = Date.now()
  let dbOk = false
  let dbError: string | null = null

  try {
    await prisma.$queryRaw`SELECT 1`
    dbOk = true
  } catch (error) {
    dbError = error instanceof Error ? error.message : 'Unknown database error'
  }

  const response = {
    status: dbOk ? 'ok' : 'degraded',
    checks: {
      database: dbOk ? 'ok' : 'error',
    },
    dbError,
    latencyMs: Date.now() - startedAt,
    timestamp: new Date().toISOString(),
  }

  return NextResponse.json(response, { status: dbOk ? 200 : 503 })
}
