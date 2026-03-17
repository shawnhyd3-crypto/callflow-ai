import { prisma } from '@/lib/prisma'

describe('prisma client', () => {
  it('exports a prisma client instance', () => {
    expect(prisma).toBeDefined()
    expect(typeof prisma.$queryRaw).toBe('function')
  })
})
