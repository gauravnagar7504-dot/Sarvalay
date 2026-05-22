'use client';

import { useState } from 'react';
import { Brush, IndianRupee, Image as ImageIcon, CalendarCheck, ArrowRight, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { updateArtistAvailability } from '@/app/actions/operations';

interface ArtistDashboardClientProps {
  dbUser: any;
}

export default function ArtistDashboardClient({ dbUser }: ArtistDashboardClientProps) {
  const profile = dbUser?.artistProfile;
  const [isAvailable, setIsAvailable] = useState(profile?.isAvailable ?? true);
  const [submitting, setSubmitting] = useState(false);
  
  const projects = dbUser?.artistProjects || [];
  const activeProjects = projects.filter((p: any) => p.status !== 'COMPLETED');
  
  const handleToggleAvailability = async () => {
    if (!profile?.id) return;
    setSubmitting(true);
    const newStatus = !isAvailable;
    const res = await updateArtistAvailability(profile.id, newStatus);
    setSubmitting(false);
    if (res.success) {
      setIsAvailable(newStatus);
      alert(`Your availability has been updated to: ${newStatus ? 'Available' : 'Unavailable'}`);
    } else {
      alert('Error updating status: ' + res.error);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
            Welcome back, {dbUser?.name || 'Creator'}.
          </h1>
          <p style={{ color: '#6B7280' }}>
            Tier Rank: <span style={{ fontWeight: '600', color: 'var(--color-indigo)' }}>{profile?.tier?.replace('_', ' ') || 'TIER 3'}</span> | You have {activeProjects.length} active B2B projects.
          </p>
        </div>
        <button 
          onClick={handleToggleAvailability}
          disabled={submitting}
          style={{ 
            background: isAvailable ? 'var(--color-indigo)' : '#D1D5DB', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            fontWeight: '600', 
            fontSize: '0.9rem', 
            cursor: 'pointer',
            transition: 'background 0.2s ease',
            opacity: submitting ? 0.75 : 1
          }}
        >
          {submitting ? 'Updating...' : isAvailable ? '✓ Available for Site Murals' : '× Set Available'}
        </button>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <MetricCard title="Assigned Projects" value={projects.length} icon={Brush} />
        <MetricCard title="Available to Match" value={isAvailable ? 'Yes' : 'No'} icon={CalendarCheck} highlight={isAvailable} />
        <MetricCard title="Earnings Paid" value={`₹${profile?.earningsPaid || 0}`} icon={IndianRupee} />
        <MetricCard title="Pending Earnings" value={`₹${profile?.earningsPend || 0}`} icon={IndianRupee} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px' }} className="contact-grid">
        {/* Main Content Area */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '700', color: '#111827' }}>Your Projects</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {projects.length === 0 ? (
              <div className="glass-card" style={{ padding: '48px', textAlign: 'center', color: '#6B7280', background: '#fff' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🎨</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.15rem', color: '#111827', marginBottom: '8px' }}>No active assignments</h3>
                <p style={{ maxWidth: '400px', margin: '0 auto', fontSize: '0.88rem' }}>
                  Make sure your availability toggle is ON above. When an administrator matches you to a client space in your region, the details will appear here instantly!
                </p>
              </div>
            ) : (
              projects.map((project: any) => (
                <div key={project.id} style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '12px', background: 'rgba(179,18,23,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
                    🎨
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '240px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-indigo)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ACTIVE ASSIGNMENT</span>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '700', color: '#111827', marginTop: '4px' }}>{project.title}</h3>
                      </div>
                      <span className="badge badge-indigo" style={{ textTransform: 'capitalize' }}>
                        {project.status.replace('_', ' ').toLowerCase()}
                      </span>
                    </div>
                    
                    <p style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '16px', lineHeight: '1.5' }}>
                      Space Operator: {project.company} | Current completion rate set by Admin: {project.progress}%
                    </p>
                    
                    <Link href={`/dashboard/artist/projects`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#111827', fontWeight: '600', textDecoration: 'none' }}>
                      View Project Details &amp; SOPs <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Sidebar Column */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>Upcoming Milestones</h2>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F3F4F6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                <span style={{ fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase' }}>Mil</span>
                <span style={{ fontSize: '1rem', color: '#111827', lineHeight: '1' }}>50</span>
              </div>
              <div>
                <div style={{ fontWeight: '600', color: '#111827', fontSize: '0.95rem' }}>Advance Payout</div>
                <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Released on Layout Signoff</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F3F4F6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                <span style={{ fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase' }}>Mil</span>
                <span style={{ fontSize: '1rem', color: '#111827', lineHeight: '1' }}>30</span>
              </div>
              <div>
                <div style={{ fontWeight: '600', color: '#111827', fontSize: '0.95rem' }}>Mid-Phase Payout</div>
                <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Released on Draft Approval</div>
              </div>
            </div>
          </div>

          <div style={{ background: '#111827', borderRadius: '16px', padding: '24px', color: 'white' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PlayCircle size={20} /> Latest SOP Training
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '16px', lineHeight: '1.5' }}>Watch the new guide on protective coatings for high-traffic commercial areas.</p>
            <Link href="/dashboard/artist/training" style={{ textDecoration: 'none' }}>
              <button style={{ width: '100%', padding: '10px', background: 'white', color: '#111827', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer' }}>
                Access Training Library
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function MetricCard({ title, value, highlight, icon: Icon }: any) {
  return (
    <div style={{ background: highlight ? 'var(--color-indigo)' : '#FFFFFF', borderRadius: '16px', border: highlight ? 'none' : '1px solid #E5E7EB', padding: '24px', color: highlight ? 'white' : '#111827' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: highlight ? 'rgba(255,255,255,0.2)' : '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={20} style={{ color: highlight ? '#FFFFFF' : 'var(--color-indigo)' }} />
        </div>
      </div>
      <div style={{ fontSize: '0.875rem', color: highlight ? 'rgba(255,255,255,0.8)' : '#6B7280', fontWeight: '500', marginBottom: '8px' }}>{title}</div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700' }}>{value}</div>
    </div>
  );
}
