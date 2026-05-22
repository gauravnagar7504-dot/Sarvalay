import { prisma } from '@/lib/prisma';
import ClientsClient from './ClientsClient';

export const dynamic = 'force-dynamic';

export default async function AdminClientsPage() {
  const clients = await prisma.user.findMany({
    where: {
      role: 'CLIENT',
    },
    include: {
      clientProjects: {
        include: {
          invoices: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <ClientsClient initialClients={clients} />;
}
