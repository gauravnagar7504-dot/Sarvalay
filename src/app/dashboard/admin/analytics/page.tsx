'use client';
import { BarChart3, LineChart, PieChart as PieChartIcon, ArrowUpRight, TrendingUp, Users } from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Analytics & Intelligence</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Data-driven insights across sales, operations, and artist performance.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <section className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
              <TrendingUp size={20} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '600' }}>Sales Performance</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Lead Conversion Rate</span>
              <span style={{ fontWeight: '600' }}>8.4% <span style={{ color: '#10B981', fontSize: '0.8rem' }}>(+1.2%)</span></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Avg Deal Cycle</span>
              <span style={{ fontWeight: '600' }}>14 Days</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Consultation to Close</span>
              <span style={{ fontWeight: '600' }}>26.6%</span>
            </div>
          </div>
        </section>

        <section className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(179,18,23,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-indigo)' }}>
              <BarChart3 size={20} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '600' }}>Operational Efficiency</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Avg Completion Time</span>
              <span style={{ fontWeight: '600' }}>22 Days</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Project Delay Rate</span>
              <span style={{ fontWeight: '600', color: '#F59E0B' }}>12%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Material Waste</span>
              <span style={{ fontWeight: '600' }}>&lt; 5%</span>
            </div>
          </div>
        </section>

        <section className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
              <Users size={20} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '600' }}>Artist Utilization</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Tier 1 Deployment</span>
              <span style={{ fontWeight: '600' }}>85%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Avg Artist Rating</span>
              <span style={{ fontWeight: '600' }}>4.8/5.0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>New Onboarded</span>
              <span style={{ fontWeight: '600' }}>4 (This Month)</span>
            </div>
          </div>
        </section>
      </div>
      
      {/* Visual Chart Placeholder */}
      <section className="glass-card" style={{ padding: '24px', height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <LineChart size={64} style={{ color: 'var(--color-border)', marginBottom: '16px' }} />
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--color-text-secondary)' }}>Revenue Growth Visualization</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Chart component integration pending (Chart.js / Recharts)</p>
      </section>
    </div>
  );
}
