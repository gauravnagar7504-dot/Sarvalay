import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ClientMockupsClient from './ClientMockupsClient';

export const dynamic = 'force-dynamic';

export default async function ClientMockupsPage() {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }

  const email = user.emailAddresses[0]?.emailAddress;
  const dbUser = await prisma.user.findUnique({
    where: { email },
    include: {
      clientProjects: {
        include: {
          mockups: {
            include: {
              project: true,
            },
          },
        },
      },
    },
  });

  if (!dbUser) {
    redirect('/dashboard/sync');
  }

  // Extract all mockups from all client projects
  const projects = dbUser.clientProjects || [];
  const mockups = projects.flatMap(p => p.mockups);

  return <ClientMockupsClient mockups={mockups} />;
}
