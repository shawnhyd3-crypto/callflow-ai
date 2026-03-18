import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

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
      voice,
      answerCalls,
      bookAppointments,
      faq,
      urgentRouting,
    } = body;

    // Get user's organization
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { organizations: true },
    });

    if (!user?.organizationId) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Create phone agent
    const agent = await prisma.phoneAgent.create({
      data: {
        organizationId: user.organizations[0]Id,
        name: agentName,
        template: templateId,
        systemPrompt: `You are ${agentName}, a helpful assistant. ${greeting}`,
        voice,
        enabled: true,
        greetingMessage: greeting,
        config: {
          answerCalls,
          bookAppointments,
          faq,
          urgentRouting,
        },
        phoneNumber: '+1 (555) 123-4567', // Placeholder - assign real number in production
      },
    });

    // Update organization
    await prisma.organization.update({
      where: { id: user.organizations[0]Id },
      data: {
        isOnboarded: true,
        industry,
        businessPhone,
        onboardedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        agent: {
          id: agent.id,
          name: agent.name,
          phoneNumber: agent.phoneNumber,
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
