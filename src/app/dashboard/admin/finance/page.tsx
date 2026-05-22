import { prisma } from '@/lib/prisma';
import FinanceClient from './FinanceClient';

export const dynamic = 'force-dynamic';

export default async function AdminFinancePage() {
  const invoices = await prisma.invoice.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      project: {
        include: {
          client: true,
        },
      },
    },
  });

  return <FinanceClient initialInvoices={invoices} />;
}
