import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'
import { enforceCsrf } from '@/lib/security'

export async function GET() {
  const organization = await prisma.organization.findFirst({
    include: { referrals: true },
  })

  if (!organization) {
    return NextResponse.json({ referral: null })
  }

  return NextResponse.json({
    referral: organization.referrals[0] ?? null,
    credits: organization.referralCredits,
  })
}

export async function POST(request: NextRequest) {
  const rateLimited = await rateLimit(request, 'api')
  if (rateLimited) return rateLimited

  const csrf = enforceCsrf(request)
  if (csrf) return csrf

  const { code } = await request.json()
  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 })
  }

  const referral = await prisma.referral.findUnique({ where: { code } })
  if (!referral) {
    return NextResponse.json({ error: 'Referral code not found' }, { status: 404 })
  }

  return NextResponse.json({ referral })
}
