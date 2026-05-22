'use client';

import { useState } from 'react';
import { Download, CheckCircle2, Clock, Camera, AlertCircle } from 'lucide-react';

interface ClientProjectsClientProps {
  projects: any[];
}

export default function ClientProjectsClient({ projects }: ClientProjectsClientProps) {
  const [selectedProject, setSelectedProject] = useState<any>(projects[0] || null);

  if (projects.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ width: '64px', height: '64px', background: 'rgba(179,18,23,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <span style={{ fontSize: '24px' }}>🎨</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Your Art Projects</h1>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '500px', margin: '0 auto 24px', lineHeight: '1.6' }}>
          Welcome to the Sarvalay B2B Platform! Your customized mural or visual installation project will appear here once our curation board finalizes your space consultation.
        </p>
        <a href="/consult" className="btn-primary" style={{ padding: '10px 24px', textDecoration: 'none', display: 'inline-block' }}>
          Schedule Consultation
        </a>
      </div>
    );
  }

  const status = selectedProject.status; // MOCKUP_PHASE, EXECUTING, QA_CHECK, COMPLETED
  const progress = selectedProject.progress;
  const artist = selectedProject.artist;
  const progressPhotos = selectedProject.progressPhotos || [];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Project Selector (if multiple projects exist) */}
      {projects.length > 1 && (
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProject(p)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: selectedProject.id === p.id ? 'var(--color-indigo)' : 'var(--color-border)',
                background: selectedProject.id === p.id ? 'var(--color-indigo)' : '#FFF',
                color: selectedProject.id === p.id ? '#FFF' : 'var(--color-text-primary)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {p.company} - {p.title}
            </button>
          ))}
        </div>
      )}

      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Project ID: {selectedProject.id.slice(0, 8).toUpperCase()}
          </span>
          <span className="badge badge-indigo" style={{ textTransform: 'capitalize' }}>
            {status.replace('_', ' ').toLowerCase()} ({progress}%)
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: '400', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
          {selectedProject.title}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.6' }}>
          Custom art execution for {selectedProject.company}. Managed entirely via Sarvalay's operations network.
        </p>
      </div>

      {/* Progress Tracker */}
      <section style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px', marginBottom: '40px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 24px rgba(0,0,0,0.02)' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '32px' }}>Execution Timeline</h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', flexWrap: 'wrap', gap: '20px' }}>
          {/* Progress Line */}
          <div style={{ position: 'absolute', top: '16px', left: '40px', right: '40px', height: '2px', background: 'rgba(0,0,0,0.05)', zIndex: 0 }} className="funnel-arrow-hide" />
          <div 
            style={{ 
              position: 'absolute', 
              top: '16px', 
              left: '40px', 
              width: status === 'COMPLETED' ? 'calc(100% - 80px)' : status === 'QA_CHECK' ? '80%' : status === 'EXECUTING' ? '50%' : '20%', 
              height: '2px', 
              background: 'var(--color-indigo)', 
              zIndex: 1 
            }} 
            className="funnel-arrow-hide"
          />

          <TimelineStep label="Consultation" date="Done" status="completed" />
          <TimelineStep label="Mockups" date="Done" status={status !== 'MOCKUP_PHASE' ? 'completed' : 'active'} />
          <TimelineStep label="Site Prep" date="Done" status={status !== 'MOCKUP_PHASE' ? 'completed' : 'upcoming'} />
          <TimelineStep label="Execution" date={status === 'EXECUTING' ? 'Active' : status === 'QA_CHECK' || status === 'COMPLETED' ? 'Done' : 'Pending'} status={status === 'EXECUTING' ? 'active' : status === 'QA_CHECK' || status === 'COMPLETED' ? 'completed' : 'upcoming'} />
          <TimelineStep label="QA Check" date={status === 'QA_CHECK' ? 'Active' : status === 'COMPLETED' ? 'Done' : 'Pending'} status={status === 'QA_CHECK' ? 'active' : status === 'COMPLETED' ? 'completed' : 'upcoming'} />
          <TimelineStep label="Delivered" date={status === 'COMPLETED' ? 'Delivered' : 'Pending'} status={status === 'COMPLETED' ? 'completed' : 'upcoming'} />
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' }} className="contact-grid">
        {/* Main Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Live Progress Photo Gallery */}
          <section style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 24px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '600' }}>Live Progress Gallery</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Camera size={14} /> Real-Time Updates
              </span>
            </div>
            
            {progressPhotos.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)', border: '1px dashed var(--color-border)', borderRadius: '8px' }}>
                <Camera size={32} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                <div>No site progress photos uploaded yet.</div>
                <div style={{ fontSize: '0.8rem' }}>Check back later once the artist begins physically painting.</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {progressPhotos.map((photo: any) => (
                  <div key={photo.id} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)', background: '#FFF' }}>
                    <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                      <img src={photo.imageUrl} alt={photo.description || 'Progress'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    {photo.description && (
                      <div style={{ padding: '8px 12px', fontSize: '0.8rem', color: 'var(--color-text-secondary)', borderTop: '1px solid var(--color-border)' }}>
                        {photo.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Scope and Details */}
          <section style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 24px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '600', marginBottom: '24px' }}>Project Scope & Details</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <DetailRow label="Client Organization" value={selectedProject.company} />
              <DetailRow label="Project Title" value={selectedProject.title} />
              <DetailRow label="Lead Artist" value={artist ? artist.name : 'Curating / Unassigned'} />
              <DetailRow label="Specialist Tier" value={artist?.artistProfile ? artist.artistProfile.tier.replace('_', ' ').replace('TIER ', 'Tier ') : 'Unassigned'} />
              <DetailRow label="Supervision" value="Sarvalay Operations Board" />
            </div>
          </section>

        </div>

        {/* Sidebar Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 24px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '600', marginBottom: '20px' }}>Documents & Mockups</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedProject.mockups?.map((mock: any, idx: number) => (
                <div key={mock.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)', background: '#FDFBF8' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-primary)' }}>{mock.title}</div>
                  </div>
                  <span className={`badge ${mock.isApproved ? 'badge-indigo' : 'badge-gold'}`} style={{ fontSize: '0.65rem' }}>
                    {mock.isApproved ? 'Approved' : 'Review'}
                  </span>
                </div>
              ))}
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '12px' }}>
                All document approvals are encrypted on Supabase ledger logs.
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function TimelineStep({ label, date, status }: any) {
  const isCompleted = status === 'completed';
  const isActive = status === 'active';
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', zIndex: 2, width: '80px' }}>
      <div style={{ 
        width: '32px', height: '32px', borderRadius: '50%', 
        background: isCompleted ? 'var(--color-indigo)' : isActive ? '#FFFFFF' : '#FFFFFF',
        border: isActive ? '3px solid var(--color-indigo)' : isCompleted ? 'none' : '2px solid rgba(0,0,0,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: isCompleted ? '#FFFFFF' : 'transparent',
        boxShadow: isActive ? '0 0 0 4px rgba(179,18,23,0.1)' : 'none'
      }}>
        {isCompleted && <CheckCircle2 size={18} style={{ color: '#FFF' }} />}
        {isActive && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-indigo)' }} />}
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: isActive ? '700' : '600', color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', marginBottom: '4px' }}>{label}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{date}</div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: any) {
  return (
    <div style={{ display: 'flex', paddingBottom: '16px', borderBottom: '1px solid rgba(0,0,0,0.05)', flexWrap: 'wrap', gap: '8px' }}>
      <div style={{ width: '160px', color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>{label}</div>
      <div style={{ flex: 1, color: 'var(--color-text-primary)', fontWeight: '500', fontSize: '0.95rem' }}>{value}</div>
    </div>
  );
}
