
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  const user = await prisma.user.findFirst();
  if (!user) { console.log('No user found'); return; }
  console.log('Found user:', user.id, user.email);

  const org = await prisma.organization.create({
    data: {
      name: 'Acme Plumbing Services',
      slug: 'acme-plumbing',
      description: 'Professional plumbing services for residential and commercial',
      website: 'https://acmeplumbing.com',
      ownerId: user.id,
      referralCode: 'ACME-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      isOnboarded: true,
      industry: 'plumber',
    }
  });
  console.log('Created org:', org.id, org.name);

  const template = await prisma.agentTemplate.findFirst({ where: { industry: 'plumber' } });
  const agent = await prisma.phoneAgent.create({
    data: {
      organizationId: org.id,
      name: 'Demo Receptionist',
      description: 'AI receptionist for Acme Plumbing',
      status: 'active',
      templateId: template ? template.id : undefined,
      systemPrompt: template ? template.systemPrompt : 'You are a professional receptionist.',
      voiceId: 'aura-asteria-en',
      firstMessage: 'Thanks for calling Acme Plumbing! How can I help you today?',
      answerCalls: true,
      bookAppointments: true,
      answerFAQs: true,
      routeUrgent: true,
    }
  });
  console.log('Created agent:', agent.id, agent.name);

  const now = new Date();
  await prisma.usageRecord.create({
    data: {
      organizationId: org.id,
      minutesUsed: 0,
      minutesLimit: 100,
      billingPeriodStart: new Date(now.getFullYear(), now.getMonth(), 1),
      billingPeriodEnd: new Date(now.getFullYear(), now.getMonth() + 1, 1),
    }
  });
  console.log('Seeding complete');
}
fix().catch(e => console.error(e.message)).finally(() => prisma.$disconnect());
