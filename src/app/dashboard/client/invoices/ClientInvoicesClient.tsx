'use client';

import { useState } from 'react';
import { Download, CreditCard, FileText, CheckCircle, Clock } from 'lucide-react';

interface ClientInvoicesClientProps {
  invoices: any[];
}

export default function ClientInvoicesClient({ invoices }: ClientInvoicesClientProps) {
  const [loadingInvoiceId, setLoadingInvoiceId] = useState<string | null>(null);

  // Calculations
  const contractValue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidToDate = invoices.filter(inv => inv.isPaid).reduce((sum, inv) => sum + inv.amount, 0);
  const upcomingMilestone = invoices.filter(inv => !inv.isPaid).reduce((sum, inv) => sum + inv.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Invoices & Billing Hub</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Review contract values, track milestone installments, and download official tax invoices.</p>
      </div>

      {/* Financial Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <SummaryCard title="Total Contract Value" value={formatCurrency(contractValue)} type="primary" />
        <SummaryCard title="Paid to Date" value={formatCurrency(paidToDate)} type="success" />
        <SummaryCard title="Pending Value" value={formatCurrency(upcomingMilestone)} type="pending" />
        <SummaryCard title="Active Invoices" value={`${invoices.length} Items`} type="date" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }} className="contact-grid">
        {/* Invoices List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          <section className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px', color: 'var(--color-text-primary)' }}>Milestone Payment Plan</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {invoices.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No active invoices available. When a project is spawned, milestones are generated automatically.
                </div>
              ) : (
                invoices.map((inv) => {
                  const labelMap: any = {
                    ADVANCE_50: '50% Booking Advance',
                    MID_30: '30% Design & Prep Approval',
                    DELIVERY_20: '20% Handover & Delivery',
                  };
                  return (
                    <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--color-bg-secondary)', borderRadius: '8px', border: '1px solid var(--color-border)', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>
                            {labelMap[inv.milestone] || inv.milestone}
                          </span>
                          <span className={`badge ${inv.isPaid ? 'badge-indigo' : 'badge-gold'}`} style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                            {inv.isPaid ? 'Settled' : 'Unpaid'}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block', marginTop: '4px' }}>
                          Project: {inv.projectTitle} ({inv.projectCompany})
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-text-primary)', display: 'block' }}>
                          {formatCurrency(inv.amount)}
                        </span>
                        {inv.isPaid && inv.paidAt && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                            Paid on {new Date(inv.paidAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          <section className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px', color: 'var(--color-text-primary)' }}>Tax Invoices & Receipts</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {invoices.length === 0 ? (
                <div style={{ padding: '12px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No tax documents generated yet.
                </div>
              ) : (
                invoices.map((inv) => (
                  <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(179,18,23,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-indigo)' }}>
                        <FileText size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>{inv.refId}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                          Tax Invoice • {new Date(inv.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-text-primary)', display: 'block' }}>
                          {formatCurrency(inv.amount)}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: inv.isPaid ? '#10B981' : '#F59E0B', fontWeight: '600' }}>
                          {inv.isPaid ? 'Settled' : 'Pending Verification'}
                        </span>
                      </div>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Tax invoice PDF download for ${inv.refId} is being processed. It will be sent to your registered email.`);
                        }}
                        style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-secondary)' }} 
                        title="Download PDF"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>

        {/* Sidebar Payments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section className="glass-card" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(179,18,23,0.03) 0%, rgba(179,18,23,0.08) 100%)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '600', marginBottom: '16px', color: 'var(--color-text-primary)' }}>Secure Payouts</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>Make secure Bank Transfers (NEFT/RTGS) directly via corporate gateway using details below:</p>
            
            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <div>
                <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem' }}>ACCOUNT NAME</span>
                <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>SARVALAY LUXURY LABS LLP</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem' }}>BANK NAME</span>
                <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>HDFC BANK LTD</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem' }}>ACCOUNT NUMBER</span>
                <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>50200084400569</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.75rem' }}>IFSC CODE</span>
                <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>HDFC0000240</span>
              </div>
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
              onClick={() => {
                alert("Corporate Razorpay checkout gateway initialized. Sandbox mode active.");
              }}
            >
              <CreditCard size={16} /> Pay Online (Razorpay)
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, type }: { title: string, value: string | number, type: 'primary' | 'success' | 'pending' | 'date' }) {
  let indicatorColor = 'var(--color-indigo)';
  if (type === 'success') {
    indicatorColor = '#10B981';
  } else if (type === 'pending') {
    indicatorColor = '#F59E0B';
  }

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px', padding: '20px 24px', borderLeft: `4px solid ${indicatorColor}`, boxShadow: '0 4px 16px rgba(0,0,0,0.01)' }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{title}</div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>{value}</div>
    </div>
  );
}
