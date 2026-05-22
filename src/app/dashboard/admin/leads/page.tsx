import { prisma } from '@/lib/prisma';
import LeadsClient from './LeadsClient';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <LeadsClient initialLeads={leads} />;
}
