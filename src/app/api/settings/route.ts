import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUsageAlert } from '@/lib/usage'

export async function GET() {
  const organization = await prisma.organization.findFirst({
    include: { owner: true },
  })

  if (!organization) {
    return NextResponse.json({ error: 'No organization found.' }, { status: 404 })
  }

  const [subscription, usageRecord] = await Promise.all([
    prisma.subscription.findUnique({
      where: { organizationId: organization.id },
    }),
    prisma.usageRecord.findFirst({
      where: { organizationId: organization.id },
      orderBy: { billingPeriodStart: 'desc' },
    }),
  ])

  const usageAlert = usageRecord
    ? getUsageAlert(usageRecord.minutesUsed, usageRecord.minutesLimit)
    : null

  return NextResponse.json({
    organization: {
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      description: organization.description,
      website: organization.website,
      logo: organization.logo,
      ownerId: organization.ownerId,
      ownerEmail: organization.owner.email,
    },
    subscription,
    usageRecord,
    usageAlert,
  })
}

export async function PUT(request: NextRequest) {
  const body = await request.json()

  const organization = await prisma.organization.findFirst()
  if (!organization) {
    return NextResponse.json({ error: 'No organization found.' }, { status: 404 })
  }

  const data = {
    name: typeof body.name === 'string' ? body.name : organization.name,
    website: typeof body.website === 'string' ? body.website : organization.website,
    description: typeof body.description === 'string' ? body.description : organization.description,
    logo: typeof body.logo === 'string' ? body.logo : organization.logo,
  }

  const updated = await prisma.organization.update({
    where: { id: organization.id },
    data,
  })

  return NextResponse.json({
    organization: {
      id: updated.id,
      name: updated.name,
      slug: updated.slug,
      description: updated.description,
      website: updated.website,
      logo: updated.logo,
      ownerId: updated.ownerId,
    },
  })
}
