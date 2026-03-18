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
    const { type, score, comment, page } = body;

    // Get user's organization
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { organizationId: true },
    });

    if (!user?.organizationId) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Create feedback record
    const feedback = await prisma.feedback.create({
      data: {
        organizationId: user.organizationId,
        userId: session.user.id,
        type,
        score: type === 'nps' ? score : null,
        comment,
        page,
      },
    });

    return NextResponse.json(
      { success: true, feedbackId: feedback.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Feedback Creation Error]:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { organizationId: true, role: true },
    });

    if (!user?.organizationId || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only admins can view feedback' },
        { status: 403 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build filter
    const where: any = {
      organizationId: user.organizationId,
    };

    if (type) {
      where.type = type;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    // Fetch feedback
    const feedback = await prisma.feedback.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    // Calculate NPS if there are NPS feedbacks
    const npsScores = feedback
      .filter((f) => f.type === 'nps' && f.score !== null)
      .map((f) => f.score as number);

    let averageNps: number | null = null;
    if (npsScores.length > 0) {
      averageNps = Math.round(
        npsScores.reduce((a, b) => a + b, 0) / npsScores.length
      );
    }

    return NextResponse.json({
      feedback,
      averageNps,
      total: feedback.length,
      npsCount: npsScores.length,
    });
  } catch (error) {
    console.error('[Feedback Fetch Error]:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}
