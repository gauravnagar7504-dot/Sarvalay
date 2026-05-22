'use client';

import { useState } from 'react';
import { IndianRupee, Download, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';

interface ArtistEarningsClientProps {
  dbUser: any;
  invoices: any[];
}

export default function ArtistEarningsClient({ dbUser, invoices }: ArtistEarningsClientProps) {
  const profile = dbUser?.artistProfile;
  const earningsPaid = profile?.earningsPaid || 0;
  const earningsPend = profile?.earningsPend || 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleExport = () => {
    alert('Exporting statement as PDF. Sourcing transaction ledger items...');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Earnings & Ledger</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Track your completed murals, pending milestone clearances, and overall payouts.</p>
        </div>
        <button 
          onClick={handleExport}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}
        >
          <Download size={16} /> Export Statement
        </button>
      </div>

      {/* Top Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <MetricCard title="Total Payouts" value={formatCurrency(earningsPaid)} desc="All-time cleared earnings" icon={IndianRupee} />
        <MetricCard title="Pending Clearance" value={formatCurrency(earningsPend)} desc="Due on client milestone approvals" icon={Clock} highlight />
        <MetricCard title="Active Projects" value={`${dbUser?.artistProjects?.filter((p: any) => p.status !== 'COMPLETED').length || 0} Spaces`} desc="Ongoing mural executions" icon={ArrowUpRight} />
        <MetricCard title="Verification Status" value={profile?.isAvailable ? "Active" : "Pending Approval"} desc="Artist onboarding profile tier" icon={CheckCircle2} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px' }} className="contact-grid">
        {/* Main Ledger */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '20px' }}>Milestone Ledger Items</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {invoices.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  No transaction milestones assigned. Once a project advance/progress payment is cleared, it will appear here.
                </div>
              ) : (
                invoices.map((inv) => (
                  <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>
                        {inv.projectTitle} - {inv.milestone.replace('_', ' ')}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                        Reference ID: {inv.refId} • Generated {new Date(inv.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '700', color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>
                        {formatCurrency(inv.amount)}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: inv.isPaid ? '#10B981' : '#F59E0B', fontWeight: '600' }}>
                        {inv.isPaid ? 'Cleared' : 'Pending Verification'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Sidebar earnings details */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Verified Payout Bank</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>Your payouts are processed directly via secure automated NEFT transfer to your registered account.</p>
            <div style={{ background: '#F9FAFB', padding: '16px', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid var(--color-border)' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block' }}>HOLDER NAME</span>
                <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>{dbUser?.name}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block' }}>BANK NAME</span>
                <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>STATE BANK OF INDIA</span>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block' }}>ACCOUNT NUMBER</span>
                <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>••••••••3821</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function MetricCard({ title, value, desc, highlight, icon: Icon }: any) {
  return (
    <div style={{ 
      background: highlight ? 'var(--color-indigo)' : '#FFFFFF', 
      borderRadius: '16px', 
      border: highlight ? 'none' : '1px solid var(--color-border)', 
      padding: '24px', 
      color: highlight ? 'white' : 'var(--color-text-primary)',
      boxShadow: highlight ? '0 12px 24px rgba(179,18,23,0.15)' : 'none'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: highlight ? 'rgba(255,255,255,0.2)' : 'rgba(179,18,23,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={20} style={{ color: highlight ? '#FFFFFF' : 'var(--color-indigo)' }} />
        </div>
      </div>
      <div style={{ fontSize: '0.875rem', color: highlight ? 'rgba(255,255,255,0.8)' : 'var(--color-text-secondary)', fontWeight: '500', marginBottom: '4px' }}>{title}</div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', marginBottom: '4px' }}>{value}</div>
      <div style={{ fontSize: '0.75rem', color: highlight ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)' }}>{desc}</div>
    </div>
  );
}
