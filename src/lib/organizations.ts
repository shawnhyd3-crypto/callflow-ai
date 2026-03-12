import { cookies } from 'next/headers'

import { prisma } from '@/lib/prisma'

export async function getActiveOrganization() {
  const impersonatedId = cookies().get('impersonateOrgId')?.value
  if (impersonatedId) {
    const org = await prisma.organization.findUnique({ where: { id: impersonatedId } })
    if (org) return org
  }

  return prisma.organization.findFirst()
}

export async function getImpersonatedOrganization() {
  const impersonatedId = cookies().get('impersonateOrgId')?.value
  if (!impersonatedId) return null

  return prisma.organization.findUnique({ where: { id: impersonatedId } })
}
