'use client';
import { Calendar as CalendarIcon, Truck, Box, Users, Plus, Filter, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

export default function AdminOperationsPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Logistics & Operations</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Manage materials, site installations, and team allocations.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <CalendarIcon size={18} /> Master Calendar
          </button>
          <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Plus size={18} /> Schedule Dispatch
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Logistics Module */}
        <section className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(179,18,23,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-indigo)' }}>
              <Truck size={20} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '600' }}>Active Deliveries</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <DeliveryItem project="Taj Hotels - Paints & Scaffolding" status="In Transit" eta="Today, 2:00 PM" urgent={false} />
            <DeliveryItem project="WeWork - Glass Panels" status="Delayed" eta="Rescheduling" urgent={true} />
            <DeliveryItem project="TechNova - 3D Props" status="Delivered" eta="Oct 23" urgent={false} />
          </div>
        </section>

        {/* Team Allocation */}
        <section className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
              <Users size={20} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '600' }}>Site Team Allocation</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TeamItem site="Taj Hotels Lobby" supervisor="Sakshi G." teamSize={4} />
            <TeamItem site="WeWork Entrance" supervisor="Gagan H." teamSize={2} />
            <TeamItem site="BlueBottle Cafe" supervisor="Unassigned" teamSize={0} />
          </div>
        </section>

        {/* Materials */}
        <section className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
              <Box size={20} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '600' }}>Inventory Alerts</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <InventoryAlert item="Asian Paints Premium Emulsion (Red)" stock="Low (2 Buckets)" action="Reorder" />
            <InventoryAlert item="Scaffolding Pipes (10ft)" stock="Depleted" action="Urgent Request" urgent={true} />
            <InventoryAlert item="Gold Leaf Foils" stock="Adequate" action="View" />
          </div>
        </section>
      </div>

      {/* Installation Schedule Table */}
      <section className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600' }}>Installation Calendar (Next 7 Days)</h2>
          <button style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'transparent', display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer', fontSize: '0.85rem' }}>
            <Filter size={14} /> Filter Sites
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Project Site</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Activity</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Assigned Ops</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: 'Oct 25, 10:00 AM', site: 'Taj Hotels', activity: 'Wall Prepping & Base Coat', ops: 'Sakshi G.', status: 'Scheduled' },
                { date: 'Oct 26, 09:00 AM', site: 'WeWork', activity: 'Glass Panel QA & Fitting', ops: 'Gagan H.', status: 'Pending Materials' },
                { date: 'Oct 27, 11:30 AM', site: 'BlueBottle', activity: 'Initial Artist Site Visit', ops: 'Priya S.', status: 'Confirmed' },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '16px', color: 'var(--color-text-primary)', fontWeight: '600' }}>{row.date}</td>
                  <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>{row.site}</td>
                  <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>{row.activity}</td>
                  <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>{row.ops}</td>
                  <td style={{ padding: '16px' }}>
                    <span className={`badge ${row.status === 'Confirmed' ? 'badge-indigo' : row.status === 'Scheduled' ? 'badge-gold' : ''}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function DeliveryItem({ project, status, eta, urgent }: any) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
      <div style={{ color: urgent ? '#EF4444' : status === 'Delivered' ? '#10B981' : 'var(--color-indigo)', marginTop: '2px' }}>
        {urgent ? <AlertCircle size={16} /> : status === 'Delivered' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
      </div>
      <div>
        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '4px' }}>{project}</div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: urgent ? '#EF4444' : 'var(--color-text-secondary)', fontWeight: '500' }}>{status}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>• ETA: {eta}</span>
        </div>
      </div>
    </div>
  );
}

function TeamItem({ site, supervisor, teamSize }: any) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
      <div>
        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '4px' }}>{site}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Supervisor: <span style={{ fontWeight: '500' }}>{supervisor}</span></div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--color-bg-secondary)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>
        <Users size={12} /> {teamSize > 0 ? `+${teamSize} Crew` : 'Unassigned'}
      </div>
    </div>
  );
}

function InventoryAlert({ item, stock, action, urgent }: any) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
      <div>
        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '4px' }}>{item}</div>
        <div style={{ fontSize: '0.8rem', color: urgent ? '#EF4444' : '#F59E0B', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {urgent && <AlertCircle size={12} />} {stock}
        </div>
      </div>
      <Link href="#" style={{ fontSize: '0.8rem', color: 'var(--color-indigo)', fontWeight: '600', textDecoration: 'none' }}>
        {action}
      </Link>
    </div>
  );
}
