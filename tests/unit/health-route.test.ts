import { NextResponse } from 'next/server'

const mockQueryRaw = jest.fn()

jest.mock('@/lib/prisma', () => ({
  prisma: {
    $queryRaw: (...args: unknown[]) => mockQueryRaw(...args),
  },
}))

import { GET } from '@/app/api/health/route'

describe('GET /api/health', () => {
  it('returns ok when database responds', async () => {
    mockQueryRaw.mockResolvedValueOnce([{ '?column?': 1 }])

    const response = await GET()
    expect(response).toBeInstanceOf(NextResponse)
    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data.status).toBe('ok')
    expect(data.checks.database).toBe('ok')
  })

  it('returns degraded when database errors', async () => {
    mockQueryRaw.mockRejectedValueOnce(new Error('db down'))

    const response = await GET()
    expect(response.status).toBe(503)

    const data = await response.json()
    expect(data.status).toBe('degraded')
    expect(data.checks.database).toBe('error')
    expect(data.dbError).toBe('db down')
  })
})
