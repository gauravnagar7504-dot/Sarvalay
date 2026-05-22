import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ArtistEarningsClient from './ArtistEarningsClient';

export const dynamic = 'force-dynamic';

export default async function ArtistEarningsPage() {
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
          invoices: true,
        },
      },
    },
  });

  if (!dbUser) {
    redirect('/dashboard/sync');
  }

  // Extract all invoices from all artist projects
  const projects = dbUser.artistProjects || [];
  const invoices = projects.flatMap(p => p.invoices.map(inv => ({
    ...inv,
    projectTitle: p.title,
    projectCompany: p.company,
  })));

  return <ArtistEarningsClient dbUser={dbUser} invoices={invoices} />;
}
