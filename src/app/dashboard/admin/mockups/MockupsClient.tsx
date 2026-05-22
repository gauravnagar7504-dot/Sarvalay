'use client';

import { useState, useTransition } from 'react';
import { Upload, ImageIcon, CheckCircle, Clock, LayoutGrid, AlertCircle, Plus } from 'lucide-react';
import Image from 'next/image';
import { createMockup, approveMockup } from '@/app/actions/operations';

interface MockupsClientProps {
  initialMockups: any[];
  projects: any[];
}

export default function MockupsClient({ initialMockups, projects }: MockupsClientProps) {
  const [mockups, setMockups] = useState(initialMockups);
  const [projectId, setProjectId] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleUploadMockup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !title || !imageUrl) {
      alert('Please fill out all fields.');
      return;
    }

    startTransition(async () => {
      const res = await createMockup(projectId, title, imageUrl);
      if (res.success && res.mockup) {
        const matchedProject = projects.find(p => p.id === projectId);
        setMockups(prev => [
          {
            ...res.mockup,
            project: matchedProject
          },
          ...prev
        ]);
        setTitle('');
        setImageUrl('');
        setProjectId('');
        alert('Mockup uploaded and sent to client dashboard successfully!');
      } else {
        alert('Failed to upload mockup: ' + res.error);
      }
    });
  };

  const handleToggleApproval = async (mockupId: string, currentApprovedStatus: boolean) => {
    startTransition(async () => {
      const res = await approveMockup(mockupId, !currentApprovedStatus);
      if (res.success) {
        setMockups(prev => prev.map(m => {
          if (m.id === mockupId) {
            return {
              ...m,
              isApproved: !currentApprovedStatus
            };
          }
          return m;
        }));
      } else {
        alert('Failed to toggle approval: ' + res.error);
      }
    });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Mockup Engine (IVDE)</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Manage photorealistic design proposals and client approvals.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }} className="contact-grid">
        
        {/* Main Mockups Gallery */}
        <section className="glass-card" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px' }}>
            Generated Proposals
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {mockups.length === 0 ? (
              <div style={{ gridColumn: '1/-1', padding: '48px 0', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                <ImageIcon size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                <div>No design mockups generated yet.</div>
                <div style={{ fontSize: '0.8rem' }}>Use the sidebar panel to generate or map a design option.</div>
              </div>
            ) : (
              mockups.map((mock) => {
                const isApproved = mock.isApproved;
                const project = mock.project;
                const formattedDate = new Date(mock.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });

                return (
                  <div key={mock.id} style={{ borderRadius: '12px', border: '1px solid var(--color-border)', overflow: 'hidden', background: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: '100%', aspectRatio: '16/10', position: 'relative', background: '#F3F4F6' }}>
                      {/* Premium Visual Fallback or real image */}
                      {mock.imageUrl ? (
                        <img 
                          src={mock.imageUrl} 
                          alt={mock.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            // fallback placeholder icon if URL fails
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : null}
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-indigo)', fontSize: '2rem', background: 'rgba(179,18,23,0.03)', zIndex: 0 }}>
                        🎨
                      </div>
                      <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}>
                        <span 
                          style={{ 
                            background: isApproved ? '#10B981' : '#F59E0B', 
                            color: 'white', 
                            padding: '4px 8px', 
                            borderRadius: '20px', 
                            fontSize: '0.7rem', 
                            fontWeight: '600', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '4px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
                          }}
                        >
                          {isApproved ? <CheckCircle size={12} /> : <Clock size={12} />}
                          {isApproved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                    </div>

                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                        {mock.title}
                      </h3>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                        Project: {project?.company || 'Unassigned'}
                      </div>
                      
                      <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{formattedDate}</span>
                        <button
                          onClick={() => handleToggleApproval(mock.id, isApproved)}
                          disabled={isPending}
                          style={{
                            padding: '6px 12px',
                            fontSize: '0.8rem',
                            borderRadius: '6px',
                            fontWeight: '600',
                            border: '1px solid',
                            cursor: 'pointer',
                            borderColor: isApproved ? 'rgba(16,185,129,0.2)' : 'var(--color-indigo)',
                            background: isApproved ? 'rgba(16,185,129,0.05)' : 'var(--color-indigo)',
                            color: isApproved ? '#10B981' : '#FFF',
                          }}
                        >
                          {isApproved ? 'Revoke Approval' : 'Force Approve'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Sidebar Creation Panel */}
        <section className="glass-card" style={{ padding: '24px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '600', marginBottom: '20px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Plus size={18} style={{ color: 'var(--color-indigo)' }} /> Push Design Mockup
          </h2>

          <form onSubmit={handleUploadMockup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '6px' }}>Target Project</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', background: '#FFF' }}
              >
                <option value="">Select Project...</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.company} - {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '6px' }}>Mockup Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Option A: Heritage Indian Fusion"
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', background: '#FFF' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '6px' }}>Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="e.g. /images/mockup_after.png"
                required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', background: '#FFF' }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
                Type an asset path or dynamic image URL.
              </span>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="btn-primary"
              style={{ width: '100%', padding: '12px', fontWeight: '600', border: 'none', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center', cursor: 'pointer' }}
            >
              <Upload size={18} /> Upload & Publish
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}
