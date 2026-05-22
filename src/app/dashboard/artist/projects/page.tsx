import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ArtistProjectsClient from './ArtistProjectsClient';

export const dynamic = 'force-dynamic';

export default async function ArtistProjectsPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const email = user.emailAddresses[0]?.emailAddress;
  const dbUser = await prisma.user.findUnique({
    where: { email },
    include: {
      artistProjects: {
        include: {
          client: true,
          progressPhotos: { orderBy: { createdAt: 'desc' } }
        }
      }
    }
  });

  if (!dbUser) redirect('/dashboard/sync');

  return <ArtistProjectsClient projects={dbUser.artistProjects || []} />;
}
