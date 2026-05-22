'use client';

import { Users, Briefcase, IndianRupee, PenTool, ArrowUpRight, ArrowDownRight, Bell, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface AdminDashboardClientProps {
  leads: any[];
  projects: any[];
  artists: any[];
  invoices: any[];
}

export default function AdminDashboardClient({ leads, projects, artists, invoices }: AdminDashboardClientProps) {
  // Compute Real Metrics
  const totalLeads = leads.length;
  const activeProjectsCount = projects.filter(p => p.status !== 'COMPLETED').length;
  const totalArtistsCount = artists.length;
  
  // Calculate total monthly revenue based on cleared invoices
  const totalRevenue = invoices
    .filter(inv => inv.isPaid)
    .reduce((sum, inv) => sum + inv.amount, 0);
  
  const formattedRevenue = `₹${(totalRevenue / 100000).toFixed(1)}L`;

  // Pipeline funnel steps
  const leadSubmittedCount = leads.filter(l => l.status === 'SUBMITTED').length;
  const leadConsultedCount = leads.filter(l => l.status === 'CONSULTED').length;
  const leadMockupsCount = leads.filter(l => l.status === 'MOCKUP_GENERATED').length;
  const leadProposalsCount = leads.filter(l => l.status === 'PROPOSAL_SENT').length;
  const leadClosedCount = leads.filter(l => l.status === 'CLOSED').length;

  // Filter 4 recent projects
  const recentProjects = projects.slice(0, 4);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Operations Overview</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Welcome back. Here is what is happening across Sarvalay today.</p>
      </div>

      {/* Top Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <MetricCard title="Total Leads (Pipeline)" value={totalLeads} change="+12%" icon={Users} positive />
        <MetricCard title="Active Projects" value={activeProjectsCount} change={`+${projects.filter(p => p.status === 'MOCKUP_PHASE').length}`} icon={Briefcase} positive />
        <MetricCard title="Settled Revenue" value={formattedRevenue} change="+18%" icon={IndianRupee} positive />
        <MetricCard title="Registered Artists" value={totalArtistsCount} change="Active" icon={PenTool} positive />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', marginBottom: '40px' }} className="contact-grid">
        {/* Main Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Funnel Visualization */}
          <section className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px', color: 'var(--color-text-primary)' }}>Lead Pipeline Funnel</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FAFAFA', padding: '24px', borderRadius: '12px', border: '1px solid var(--color-border)', flexWrap: 'wrap', gap: '16px' }}>
              <FunnelStep label="Submitted" value={leadSubmittedCount} />
              <FunnelArrow />
              <FunnelStep label="Consulted" value={leadConsultedCount} />
              <FunnelArrow />
              <FunnelStep label="Mockups Ready" value={leadMockupsCount} />
              <FunnelArrow />
              <FunnelStep label="Proposal Sent" value={leadProposalsCount} />
              <FunnelArrow />
              <FunnelStep label="Closed (Wins)" value={leadClosedCount} active />
            </div>
            <div style={{ marginTop: '16px', textAlign: 'right', fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: '500' }}>
              Real-time pipeline counts from Supabase PostgreSQL
            </div>
          </section>

          {/* Recent Projects Table */}
          <section className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>Recent Projects</h2>
              <Link href="/dashboard/admin/projects" style={{ fontSize: '0.875rem', color: 'var(--color-indigo)', fontWeight: '500', textDecoration: 'none' }}>View All →</Link>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Client</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Project</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Artist</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Status</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        No projects generated yet. Matches will appear here.
                      </td>
                    </tr>
                  ) : (
                    recentProjects.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '16px', fontWeight: '500', color: 'var(--color-text-primary)' }}>{row.client?.name || row.company}</td>
                        <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>{row.title}</td>
                        <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>{row.artist?.name || 'Unassigned'}</td>
                        <td style={{ padding: '16px' }}>
                          <span className="badge badge-indigo" style={{ textTransform: 'capitalize' }}>
                            {row.status.replace('_', ' ').toLowerCase()}
                          </span>
                        </td>
                        <td style={{ padding: '16px', color: 'var(--color-text-secondary)', fontWeight: '600' }}>{row.progress}%</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </div>

        {/* Sidebar Column */}
        <div>
          <section className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px', color: 'var(--color-text-primary)' }}>Action Center</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Notification icon={Bell} title="Live lead registered" time="Real-time" desc="A client submitted a consultation request." type="urgent" />
              <Notification icon={CheckCircle} title="Milestones Active" time="Standard 50-30-20" desc="All payments are automatically generated." type="normal" />
              <Notification icon={Clock} title="Task Management" time="Automatic" desc="Project progress bars sync with client dashboards." type="warning" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, change, icon: Icon, positive }: any) {
  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: '500', marginBottom: '8px' }}>{title}</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>{value}</div>
        </div>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(179,18,23,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={20} style={{ color: 'var(--color-indigo)' }} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: '500', color: positive ? '#10B981' : '#EF4444' }}>
        {positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change} <span style={{ color: 'var(--color-text-muted)', fontWeight: '400', marginLeft: '4px' }}>active</span>
      </div>
    </div>
  );
}

function FunnelStep({ label, value, active }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{ 
        width: '54px', height: '54px', borderRadius: '50%', 
        background: active ? 'var(--color-indigo)' : '#FFFFFF', 
        border: active ? 'none' : '2px solid var(--color-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '700',
        color: active ? '#FFFFFF' : 'var(--color-text-primary)',
        boxShadow: active ? '0 8px 16px rgba(179,18,23,0.2)' : 'none'
      }}>
        {value}
      </div>
      <div style={{ fontSize: '0.72rem', fontWeight: '600', color: 'var(--color-text-secondary)', textAlign: 'center', maxWidth: '80px' }}>
        {label}
      </div>
    </div>
  );
}

function FunnelArrow() {
  return (
    <div style={{ height: '2px', flex: 1, background: 'var(--color-border)', margin: '0 8px', position: 'relative', top: '-12px', minWidth: '16px' }} className="funnel-arrow-hide" />
  );
}

function Notification({ icon: Icon, title, desc, time, type }: any) {
  const isUrgent = type === 'urgent';
  const isWarning = type === 'warning';
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
      <div style={{ 
        width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
        background: isUrgent ? 'rgba(179,18,23,0.1)' : isWarning ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center' 
      }}>
        <Icon size={16} style={{ color: isUrgent ? 'var(--color-indigo)' : isWarning ? '#F59E0B' : '#10B981' }} />
      </div>
      <div>
        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '6px', lineHeight: '1.4' }}>{desc}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{time}</div>
      </div>
    </div>
  );
}
