import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ClientInvoicesClient from './ClientInvoicesClient';

export const dynamic = 'force-dynamic';

export default async function ClientInvoicesPage() {
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
          invoices: true,
        },
      },
    },
  });

  if (!dbUser) {
    redirect('/dashboard/sync');
  }

  // Extract all invoices from all client projects
  const projects = dbUser.clientProjects || [];
  const invoices = projects.flatMap(p => p.invoices.map(inv => ({
    ...inv,
    projectTitle: p.title,
    projectCompany: p.company,
  })));

  return <ClientInvoicesClient invoices={invoices} />;
}
