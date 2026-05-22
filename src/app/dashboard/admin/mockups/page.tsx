import { prisma } from '@/lib/prisma';
import MockupsClient from './MockupsClient';

export const dynamic = 'force-dynamic';

export default async function AdminMockupsPage() {
  const mockups = await prisma.mockup.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      project: true,
    },
  });

  const projects = await prisma.project.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return <MockupsClient initialMockups={mockups} projects={projects} />;
}
