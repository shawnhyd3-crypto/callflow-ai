/**
 * Seed script to populate database with sample data
 * Run with: npm run db:seed
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.callLog.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.phoneNumber.deleteMany();
  await prisma.phoneAgent.deleteMany();
  await prisma.usageRecord.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();
  await prisma.agentTemplate.deleteMany();

  // Create templates
  const templates = await Promise.all([
    prisma.agentTemplate.create({
      data: {
        name: 'Plumbing',
        industry: 'plumbing',
        description: 'Perfect for plumbing services',
        systemPrompt: `You are a professional receptionist for a plumbing company. You answer calls, book appointments, and answer common questions about plumbing services.`,
        defaultVoiceId: 'aura-asteria-en',
      },
    }),
    prisma.agentTemplate.create({
      data: {
        name: 'Dentistry',
        industry: 'dentistry',
        description: 'Perfect for dental practices',
        systemPrompt: `You are a professional receptionist for a dental practice. You schedule appointments, answer questions about services, and handle patient inquiries.`,
        defaultVoiceId: 'aura-lora-en',
      },
    }),
    prisma.agentTemplate.create({
      data: {
        name: 'Restaurant',
        industry: 'restaurant',
        description: 'Perfect for restaurants',
        systemPrompt: `You are a reservation agent for a restaurant. You take reservations, answer questions about the menu, hours, and special events.`,
        defaultVoiceId: 'aura-shelby-en',
      },
    }),
  ]);

  console.log('Created templates:', templates.length);

  // Create a demo user
  const user = await prisma.user.create({
    data: {
      name: 'Demo Owner',
      email: 'demo@callflow.ai',
      image: null,
    },
  });

  console.log('Created user:', user.id);

  // Create organization
  const org = await prisma.organization.create({
    data: {
      name: 'Acme Plumbing Services',
      slug: 'acme-plumbing',
      description: 'Professional plumbing services for residential and commercial',
      website: 'https://acmeplumbing.com',
      ownerId: user.id,
    },
  });

  console.log('Created organization:', org.id);

  // Create subscription
  const subscription = await prisma.subscription.create({
    data: {
      organizationId: org.id,
      stripeCustomerId: 'cus_demo_123',
      plan: 'pro',
      status: 'active',
      currentPeriodStart: new Date('2024-03-01'),
      currentPeriodEnd: new Date('2024-04-01'),
    },
  });

  console.log('Created subscription:', subscription.id);

  // Create phone numbers
  const phones = await Promise.all([
    prisma.phoneNumber.create({
      data: {
        organizationId: org.id,
        phoneNumber: '+1 (555) 123-4567',
        displayName: 'Main Line',
        status: 'active',
      },
    }),
    prisma.phoneNumber.create({
      data: {
        organizationId: org.id,
        phoneNumber: '+1 (555) 234-5678',
        displayName: 'Support Line',
        status: 'active',
      },
    }),
  ]);

  console.log('Created phone numbers:', phones.length);

  // Create agents
  const agents = await Promise.all([
    prisma.phoneAgent.create({
      data: {
        organizationId: org.id,
        name: 'Main Receptionist',
        description: 'Main line agent for all incoming calls',
        status: 'active',
        templateId: templates[0].id,
        systemPrompt: `You are the main receptionist for Acme Plumbing Services. You answer calls professionally, take customer information, and book appointments. Business hours are 9 AM to 5 PM Monday through Friday.`,
        voiceId: 'aura-asteria-en',
        answerCalls: true,
        bookAppointments: true,
        answerFAQs: true,
        routeUrgent: true,
      },
    }),
    prisma.phoneAgent.create({
      data: {
        organizationId: org.id,
        name: 'Appointment Scheduler',
        description: 'Dedicated appointment booking agent',
        status: 'active',
        templateId: templates[0].id,
        systemPrompt: `You are a specialized appointment scheduler for Acme Plumbing. Focus on booking appointments at available times and confirming customer details.`,
        voiceId: 'aura-orion-en',
        answerCalls: false,
        bookAppointments: true,
        answerFAQs: false,
        routeUrgent: false,
      },
    }),
  ]);

  console.log('Created agents:', agents.length);

  // Create sample call logs
  const now = new Date();
  const callLogs = await Promise.all([
    prisma.callLog.create({
      data: {
        organizationId: org.id,
        agentId: agents[0].id,
        phoneNumber: '+1 (555) 999-0001',
        duration: 272,
        status: 'completed',
        outcome: 'booked',
        transcript: `Agent: Hi there, welcome to Acme Plumbing. How can I help you today?
Customer: Hi, I have a leaky faucet in my kitchen.
Agent: I'm sorry to hear that. We can definitely help you with that. Let me schedule an appointment for you. What day works best for you?
Customer: How about tomorrow at 2 PM?
Agent: Perfect! I have an opening tomorrow at 2 PM. Can I get your name and phone number?
Customer: Sure, it's John Smith, 555-1234.
Agent: Great John, we'll see you tomorrow at 2 PM. Thank you for choosing Acme Plumbing!`,
        startTime: new Date(now.getTime() - 4 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() - 4 * 60 * 60 * 1000 + 272 * 1000),
      },
    }),
    prisma.callLog.create({
      data: {
        organizationId: org.id,
        agentId: agents[0].id,
        phoneNumber: '+1 (555) 999-0002',
        duration: 135,
        status: 'completed',
        outcome: 'handled',
        transcript: `Agent: Hello, Acme Plumbing. What can we help with?
Customer: What are your business hours?
Agent: We're open Monday through Friday, 9 AM to 5 PM. Is there anything else I can help you with today?
Customer: No, that's all. Thank you.
Agent: You're welcome! Have a great day.`,
        startTime: new Date(now.getTime() - 3 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() - 3 * 60 * 60 * 1000 + 135 * 1000),
      },
    }),
    prisma.callLog.create({
      data: {
        organizationId: org.id,
        agentId: agents[0].id,
        phoneNumber: '+1 (555) 999-0003',
        duration: 312,
        status: 'completed',
        outcome: 'escalated',
        transcript: `Agent: Hello, Acme Plumbing.
Customer: Hi, I'm calling about a burst pipe in my basement.
Agent: Oh my, that's quite serious. Let me transfer you to our emergency coordinator right away.
Agent: One moment please, connecting you now.`,
        startTime: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() - 2 * 60 * 60 * 1000 + 312 * 1000),
      },
    }),
  ]);

  console.log('Created call logs:', callLogs.length);

  // Create sample appointments
  const appointments = await Promise.all([
    prisma.appointment.create({
      data: {
        organizationId: org.id,
        agentId: agents[0].id,
        clientName: 'John Smith',
        clientPhone: '+1 (555) 999-0001',
        clientEmail: 'john@example.com',
        service: 'Kitchen Faucet Repair',
        appointmentTime: new Date(now.getTime() + 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000),
        notes: 'Customer has leaky kitchen faucet',
        status: 'confirmed',
      },
    }),
    prisma.appointment.create({
      data: {
        organizationId: org.id,
        agentId: agents[0].id,
        clientName: 'Jane Doe',
        clientPhone: '+1 (555) 999-0004',
        clientEmail: 'jane@example.com',
        service: 'Bathroom Remodel',
        appointmentTime: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000),
        notes: 'Consultation for bathroom remodeling',
        status: 'confirmed',
      },
    }),
  ]);

  console.log('Created appointments:', appointments.length);

  // Create usage record
  const usage = await prisma.usageRecord.create({
    data: {
      organizationId: org.id,
      minutesUsed: 45,
      minutesLimit: 500,
      billingPeriodStart: new Date('2024-03-01'),
      billingPeriodEnd: new Date('2024-04-01'),
    },
  });

  console.log('Created usage record:', usage.id);

  console.log('Seeding complete!');
  console.log('\nDemo Credentials:');
  console.log('Email: demo@callflow.ai');
  console.log('Organization: Acme Plumbing Services');
  console.log('Agents: 2 active');
  console.log('Phone Numbers: 2');
  console.log('Monthly Usage: 45 / 500 minutes');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
