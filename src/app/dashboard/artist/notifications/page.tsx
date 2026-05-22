'use client';
import { Bell, Clock, FileText, Truck, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ArtistNotificationsPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>Creator Bulletins</h1>
        <p style={{ color: '#6B7280' }}>Platform announcements, material arrivals, calendar invites, and safety standards warnings.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <NotificationCard 
          icon={Truck}
          title="Material Dispatch Confirmed"
          desc="Asian Paints Premium Emulsion & Primer has been dispatched for Taj Hotels lobby. Delivery scheduled today before 2:00 PM."
          time="10 mins ago"
          type="success"
        />

        <NotificationCard 
          icon={AlertCircle}
          title="Daily Progress Photo Overdue"
          desc="You haven't uploaded base coatings progress photos for the Taj Lobby Mural. Please submit by end of day to clear the next milestone clearance."
          time="2 hours ago"
          type="warning"
        />

        <NotificationCard 
          icon={ShieldAlert}
          title="New Safety Directive (SOP-09)"
          desc="All sites above 8ft heights must execute scaffolding checks before painting. Gold Leaf applications require mandatory protective eyewear."
          time="1 day ago"
          type="danger"
        />

        <NotificationCard 
          icon={FileText}
          title="Invoice Settled (TXN-9021)"
          desc="50% Booking Advance (₹1,20,000) for Taj Hotel lobby project successfully cleared into SBI account. Clearances took 12 hours."
          time="2 days ago"
          type="info"
        />

        <NotificationCard 
          icon={CheckCircle2}
          title="Mockup Approved by Client"
          desc="Sarah Mathews (Taj Group coordinator) approved Option A (Heritage Fusion) design mockup walk-through. Ready for site prepping."
          time="3 days ago"
          type="success"
        />

      </div>
    </div>
  );
}

function NotificationCard({ icon: Icon, title, desc, time, type }: any) {
  let indicator = '#4F46E5';
  let bg = '#F9FAFB';
  if (type === 'success') {
    indicator = '#10B981';
    bg = 'rgba(16, 185, 129, 0.02)';
  } else if (type === 'warning') {
    indicator = '#F59E0B';
    bg = 'rgba(245, 158, 11, 0.02)';
  } else if (type === 'danger') {
    indicator = '#EF4444';
    bg = 'rgba(239, 68, 68, 0.02)';
  } else if (type === 'info') {
    indicator = '#3B82F6';
    bg = 'rgba(59, 130, 246, 0.02)';
  }

  return (
    <div style={{ background: bg, border: '1px solid #E5E7EB', borderLeft: `4px solid ${indicator}`, borderRadius: '12px', padding: '20px 24px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E5E7EB', color: indicator, flexShrink: 0 }}>
        <Icon size={20} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#111827' }}>{title}</h3>
          <span style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: '500' }}>{time}</span>
        </div>
        <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: '1.5' }}>{desc}</p>
      </div>
    </div>
  );
}
