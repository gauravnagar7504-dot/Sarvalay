import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ArtistDashboardClient from './ArtistDashboardClient';

export const dynamic = 'force-dynamic';

export default async function ArtistDashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const email = user.emailAddresses[0]?.emailAddress;

  const dbUser = await prisma.user.findUnique({
    where: { email },
    include: {
      artistProfile: true,
      artistProjects: {
        include: {
          client: true,
        },
      },
    },
  });

  // If artist is not synced yet, sync them automatically (fallback)
  if (!dbUser) {
    redirect('/dashboard/sync');
  }

  return <ArtistDashboardClient dbUser={dbUser} />;
}
