import { prisma } from '@/lib/prisma';
import AdminDashboardClient from './AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const projects = await prisma.project.findMany({
    include: {
      client: true,
      artist: true,
    },
    orderBy: { updatedAt: 'desc' },
  });

  const artists = await prisma.user.findMany({
    where: { role: 'ARTIST' },
    include: {
      artistProfile: true,
    },
  });

  const invoices = await prisma.invoice.findMany();

  return (
    <AdminDashboardClient
      leads={leads}
      projects={projects}
      artists={artists}
      invoices={invoices}
    />
  );
}
