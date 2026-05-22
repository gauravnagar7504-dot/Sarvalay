'use client';

import { Briefcase, Calendar, Image as ImageIcon, CheckCircle, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';

interface ClientDashboardClientProps {
  dbUser: any;
}

export default function ClientDashboardClient({ dbUser }: ClientDashboardClientProps) {
  const projects = dbUser?.clientProjects || [];
  const activeCount = projects.filter((p: any) => p.status !== 'COMPLETED').length;
  const completedCount = projects.filter((p: any) => p.status === 'COMPLETED').length;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Premium Hero Section */}
      <section style={{ 
        padding: '60px 48px', 
        borderRadius: '16px', 
        background: 'linear-gradient(135deg, rgba(179,18,23,0.03) 0%, rgba(179,18,23,0.08) 100%)',
        border: '1px solid rgba(179,18,23,0.1)',
        marginBottom: '40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Welcome back, <br />
            <span style={{ color: 'var(--color-indigo)' }}>{dbUser?.name || 'Valued Client'}</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '500px', lineHeight: '1.6', marginBottom: '32px' }}>
            Welcome to your Sarvalay portal. Track project progress, review photorealistic mockups, and manage your luxury art installations all in one place.
          </p>
          <Link href="/dashboard/client/projects" className="btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem', borderRadius: '8px', display: 'inline-flex' }}>
            View Active Projects
          </Link>
        </div>
        <div style={{ position: 'absolute', right: '-10%', top: '-20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(179,18,23,0.05) 0%, transparent 70%)', borderRadius: '50%' }} />
      </section>

      {/* Top Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <MetricCard title="Active Projects" value={activeCount} icon={Briefcase} />
        <MetricCard title="Completed Artworks" value={completedCount} icon={CheckCircle} />
        <MetricCard title="Total Assigned Spaces" value={projects.length} icon={ImageIcon} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', marginBottom: '40px' }} className="contact-grid">
        {/* Main Content Area */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>Active Projects</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {projects.length === 0 ? (
              <div className="glass-card" style={{ padding: '48px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🎨</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.15rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>No projects assigned yet</h3>
                <p style={{ maxWidth: '400px', margin: '0 auto', fontSize: '0.88rem' }}>
                  Our ops team is reviewing your mural specifications. Once matched, your active contracts and mockups will appear here instantly!
                </p>
              </div>
            ) : (
              projects.map((project: any) => (
                <div key={project.id} className="glass-card" style={{ padding: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ width: '120px', height: '90px', borderRadius: '8px', background: 'linear-gradient(135deg, rgba(179,18,23,0.1) 0%, rgba(179,18,23,0.05) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                    🎨
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '240px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>{project.title}</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>{project.company}</p>
                      </div>
                      <span className="badge badge-indigo" style={{ textTransform: 'capitalize' }}>
                        {project.status.replace('_', ' ').toLowerCase()}
                      </span>
                    </div>
                    
                    <div style={{ marginTop: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '8px', fontWeight: '500' }}>
                        <span>Artist: {project.artist?.name || 'Matching Verified Artist...'}</span>
                        <span>{project.progress}% Complete</span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(179,18,23,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${project.progress}%`, height: '100%', background: 'var(--color-indigo)', transition: 'width 0.4s ease' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Sidebar Column */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '20px' }}>Your Dedicated Team</h2>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-indigo)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                SD
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>Sakshi Gupta</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Project Director</div>
              </div>
            </div>
            <a href="mailto:curation@sarvalay.com" style={{ textDecoration: 'none' }} className="btn-secondary">
              <span style={{ width: '100%', textAlign: 'center' }}>Message Director</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon }: any) {
  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(179,18,23,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={20} style={{ color: 'var(--color-indigo)' }} />
        </div>
      </div>
      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', fontWeight: '500', marginBottom: '8px' }}>{title}</div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>{value}</div>
    </div>
  );
}
