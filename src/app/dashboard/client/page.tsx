import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ClientDashboardClient from './ClientDashboardClient';

export const dynamic = 'force-dynamic';

export default async function ClientDashboardPage() {
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
          artist: true,
        },
      },
    },
  });

  // If client is not synced yet, sync them automatically (fallback)
  if (!dbUser) {
    redirect('/dashboard/sync');
  }

  return <ClientDashboardClient dbUser={dbUser} />;
}
