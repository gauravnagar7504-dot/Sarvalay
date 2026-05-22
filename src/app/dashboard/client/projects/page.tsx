import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ClientProjectsClient from './ClientProjectsClient';

export const dynamic = 'force-dynamic';

export default async function ClientProjectsPage() {
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
          artist: {
            include: {
              artistProfile: true,
            },
          },
          mockups: true,
          progressPhotos: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      },
    },
  });

  if (!dbUser) {
    redirect('/dashboard/sync');
  }

  return <ClientProjectsClient projects={dbUser.clientProjects || []} />;
}
