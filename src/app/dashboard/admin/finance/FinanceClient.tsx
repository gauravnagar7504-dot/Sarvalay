'use client';

import { useState, useTransition } from 'react';
import { IndianRupee, TrendingUp, Download, CheckCircle, Clock, FileText, Search } from 'lucide-react';
import { toggleInvoicePayment } from '@/app/actions/operations';

interface FinanceClientProps {
  initialInvoices: any[];
}

export default function FinanceClient({ initialInvoices }: FinanceClientProps) {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();

  // Calculations
  const settledRevenue = invoices
    .filter(inv => inv.isPaid)
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingReceivables = invoices
    .filter(inv => !inv.isPaid)
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalInvoicesCount = invoices.length;
  const avgProjectSize = totalInvoicesCount > 0 
    ? invoices.reduce((sum, inv) => sum + inv.amount, 0) / (totalInvoicesCount / 3) 
    : 0;

  // Filtered invoices list
  const filteredInvoices = invoices.filter(inv => {
    const project = inv.project;
    const client = project?.client;
    const searchStr = `${inv.refId} ${project?.company || ''} ${project?.title || ''} ${client?.name || ''}`.toLowerCase();
    return searchStr.includes(searchTerm.toLowerCase());
  });

  const handleTogglePayment = async (invoiceId: string, currentPaidStatus: boolean) => {
    startTransition(async () => {
      const res = await toggleInvoicePayment(invoiceId, !currentPaidStatus);
      if (res.success) {
        setInvoices(prev => prev.map(inv => {
          if (inv.id === invoiceId) {
            return {
              ...inv,
              isPaid: !currentPaidStatus,
              paidAt: !currentPaidStatus ? new Date().toISOString() : null
            };
          }
          return inv;
        }));
      } else {
        alert('Failed to clear invoice: ' + res.error);
      }
    });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Financial Overview</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Track dynamic monthly revenues, pending milestones, and client accounts.</p>
        </div>
        <button className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Download size={18} /> Export Report
        </button>
      </div>

      {/* Top Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid var(--color-indigo)' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: '500', marginBottom: '8px' }}>Settled Revenue</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            ₹{(settledRevenue / 100000).toFixed(2)}L
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: '500', color: '#10B981' }}>
            <TrendingUp size={16} /> Live <span style={{ color: 'var(--color-text-muted)', fontWeight: '400' }}>from Supabase</span>
          </div>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: '500', marginBottom: '8px' }}>Pending Receivables</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            ₹{(pendingReceivables / 100000).toFixed(2)}L
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>
            Active invoices waiting check clearance
          </div>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: '500', marginBottom: '8px' }}>Avg Project Size</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            ₹{(avgProjectSize / 100000).toFixed(2)}L
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Calculated across dynamic pipeline
          </div>
        </div>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: '500', marginBottom: '8px' }}>Total Invoices</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            {totalInvoicesCount}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: '500' }}>
            50-30-20 payment structure
          </div>
        </div>
      </div>

      {/* Main List */}
      <section className="glass-card" style={{ padding: '24px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600' }}>Client Milestone Invoices</h2>
          
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', background: '#FFF' }} 
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredInvoices.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              No invoices found in record.
            </div>
          ) : (
            filteredInvoices.map((inv) => {
              const project = inv.project;
              const isPaid = inv.isPaid;
              const formattedAmt = `₹${inv.amount.toLocaleString('en-IN')}`;
              const milestoneText = inv.milestone.replace('_', ' ');

              return (
                <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', flexShrink: 0 }}>
                      <FileText size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                        {project?.company || 'Sarvalay Project'}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                        {inv.refId} • <span style={{ fontWeight: '600', color: 'var(--color-indigo)' }}>{milestoneText}</span> • Project: {project?.title || 'Unknown'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '4px' }}>{formattedAmt}</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', fontSize: '0.75rem', fontWeight: '600', color: isPaid ? '#10B981' : '#F59E0B' }}>
                        {isPaid ? <CheckCircle size={12} /> : <Clock size={12} />} {isPaid ? 'Cleared & Settled' : 'Pending Milestone'}
                      </div>
                    </div>

                    <button
                      onClick={() => handleTogglePayment(inv.id, isPaid)}
                      disabled={isPending}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: isPaid ? 'rgba(16,185,129,0.2)' : 'var(--color-indigo)',
                        background: isPaid ? 'rgba(16,185,129,0.05)' : 'var(--color-indigo)',
                        color: isPaid ? '#10B981' : '#FFF',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {isPaid ? 'Mark Unpaid' : 'Collect Clearance'}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
