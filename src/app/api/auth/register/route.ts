import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'
import { enforceCsrf } from '@/lib/security'
import { generateReferralCode, slugify } from '@/lib/referrals'

const registerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8),
  company: z.string().min(2),
  referralCode: z.string().optional(),
})

export async function POST(req: Request) {
  const rateLimited = await rateLimit(req, 'auth')
  if (rateLimited) return rateLimited

  const csrf = enforceCsrf(req)
  if (csrf) return csrf

  try {
    const body = registerSchema.parse(await req.json())

    const existingUser = await prisma.user.findUnique({ where: { email: body.email } })
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use.' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const baseSlug = slugify(body.company)
    let slug = baseSlug
    let suffix = 1

    while (await prisma.organization.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${suffix++}`
    }

    const referralCode = generateReferralCode()
    const referrer = body.referralCode
      ? await prisma.organization.findUnique({ where: { referralCode: body.referralCode } })
      : null

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        organizations: {
          create: {
            name: body.company,
            slug,
            referralCode,
            referredBy: referrer?.id,
            referrals: {
              create: {
                code: referralCode,
              },
            },
          },
        },
      },
      select: { id: true, name: true, email: true },
    })

    if (referrer) {
      await prisma.referral.update({
        where: { code: body.referralCode },
        data: {
          signups: { increment: 1 },
        },
      })
    }

    return NextResponse.json({ user })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 })
    }
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Unable to register user.' }, { status: 500 })
  }
}
