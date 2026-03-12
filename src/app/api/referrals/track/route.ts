import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  const rateLimited = await rateLimit(request, 'demo')
  if (rateLimited) return rateLimited

  const { code } = await request.json()
  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 })
  }

  const referral = await prisma.referral.findUnique({ where: { code } })
  if (!referral) {
    return NextResponse.json({ ok: true })
  }

  await prisma.referral.update({
    where: { code },
    data: { clicks: { increment: 1 } },
  })

  return NextResponse.json({ ok: true })
}
