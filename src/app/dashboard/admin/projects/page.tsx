import { prisma } from '@/lib/prisma';
import ProjectsClient from './ProjectsClient';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      client: true,
      artist: true,
    },
  });

  const artists = await prisma.user.findMany({
    where: {
      role: 'ARTIST',
    },
    include: {
      artistProfile: true,
    },
  });

  return <ProjectsClient initialProjects={projects} artists={artists} />;
}
