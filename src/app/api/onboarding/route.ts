import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      businessName,
      industry,
      businessPhone,
      templateId,
      agentName,
      greeting,
      voiceId,
      answerCalls,
      bookAppointments,
      answerFAQs,
      routeUrgent,
    } = body;

    // Get user's organization
    const org = await prisma.organization.findFirst({
      where: { ownerId: session.user.id },
    });

    if (!org) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Get template for system prompt
    let systemPrompt = `You are ${agentName}, a helpful AI phone assistant.`;
    if (templateId) {
      const template = await prisma.agentTemplate.findUnique({
        where: { id: templateId },
      });
      if (template) {
        systemPrompt = template.systemPrompt;
      }
    }

    // Create phone agent
    const agent = await prisma.phoneAgent.create({
      data: {
        organizationId: org.id,
        name: agentName || 'AI Receptionist',
        description: `AI phone agent for ${businessName || org.name}`,
        status: 'active',
        templateId: templateId || undefined,
        systemPrompt,
        voiceId: voiceId || 'aura-asteria-en',
        firstMessage: greeting || 'Hi there! How can I help you today?',
        answerCalls: answerCalls ?? true,
        bookAppointments: bookAppointments ?? false,
        answerFAQs: answerFAQs ?? true,
        routeUrgent: routeUrgent ?? false,
      },
    });

    // Update organization
    await prisma.organization.update({
      where: { id: org.id },
      data: {
        isOnboarded: true,
        industry,
        businessPhone,
        onboardedAt: new Date(),
        ...(businessName ? { name: businessName } : {}),
      },
    });

    return NextResponse.json(
      {
        success: true,
        agent: {
          id: agent.id,
          name: agent.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Onboarding Error]:', error);
    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    );
  }
}
