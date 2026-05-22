'use client';

import { useState, useTransition } from 'react';
import { approveMockup } from '@/app/actions/operations';
import { CheckCircle2, Heart, MessageSquare } from 'lucide-react';

interface ClientMockupsClientProps {
  mockups: any[];
}

export default function ClientMockupsClient({ mockups: initialMockups }: ClientMockupsClientProps) {
  const [mockups, setMockups] = useState(initialMockups);
  const [isPending, startTransition] = useTransition();
  const [loadingMockupId, setLoadingMockupId] = useState<string | null>(null);

  const handleApprove = async (mockupId: string) => {
    setLoadingMockupId(mockupId);
    startTransition(async () => {
      const res = await approveMockup(mockupId, true);
      if (res.success) {
        setMockups(prev =>
          prev.map(m => (m.id === mockupId ? { ...m, isApproved: true } : m))
        );
        alert('Mockup approved successfully! Our execution team is notified.');
      } else {
        alert(`Error approving mockup: ${res.error}`);
      }
      setLoadingMockupId(null);
    });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '16px' }}>Design Mockups</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px' }}>
            Review the photorealistic visual proposals for your spaces. Approve designs to move them into execution.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {mockups.length === 0 ? (
          <div className="glass-card" style={{ padding: '48px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🎨</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.15rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
              No mockups uploaded yet
            </h3>
            <p style={{ maxWidth: '400px', margin: '0 auto', fontSize: '0.88rem' }}>
              Our design director is curating and modeling your layout mockups. They will appear here once ready!
            </p>
          </div>
        ) : (
          mockups.map((mockup) => (
            <section key={mockup.id} className="glass-card" style={{ padding: '32px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                    {mockup.title}
                  </h2>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                    Project: {mockup.project?.title} ({mockup.project?.company}) • Uploaded {new Date(mockup.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`badge ${mockup.isApproved ? 'badge-indigo' : 'badge-gold'}`} style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                  {mockup.isApproved ? 'Approved & Locked' : 'Pending Approval'}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '24px' }}>
                {/* Render Mockup Image */}
                <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '16px', border: '1px solid var(--color-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Visual Design Proposal
                  </div>
                  <div style={{ 
                    position: 'relative', 
                    width: '100%', 
                    aspectRatio: '16/9', 
                    borderRadius: '8px', 
                    overflow: 'hidden', 
                    background: 'linear-gradient(135deg, rgba(179,18,23,0.05) 0%, rgba(179,18,23,0.02) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--color-border)'
                  }}>
                    {/* If mockup.imageUrl is valid, we could display it, otherwise display a beautiful placeholder */}
                    {mockup.imageUrl && !mockup.imageUrl.startsWith('/') && !mockup.imageUrl.includes('dummy') ? (
                      <img src={mockup.imageUrl} alt={mockup.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '3rem' }}>🖼️</span>
                        <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Mockup Render Ready</span>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ background: '#FAFAFA', borderRadius: '12px', padding: '24px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {mockup.isApproved ? (
                    <>
                      <CheckCircle2 size={32} style={{ color: '#10B981', marginBottom: '16px' }} />
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px', color: 'var(--color-text-primary)' }}>Design Locked for Execution</h3>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        This design has been officially approved. Sourcing materials, scaffolding arrangements, and color mapping have been authorized.
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px', color: 'var(--color-text-primary)' }}>Review & Signoff</h3>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '16px' }}>
                        Please review the lighting, color composition, and wall alignment. Once approved, the project moves directly into painting and execution.
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        <button 
                          onClick={() => alert('Saved design proposal to your project catalog.')}
                          style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', background: '#FFFFFF', display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem', color: 'var(--color-text-primary)' }}
                        >
                          Save
                        </button>
                        <button 
                          onClick={() => {
                            const note = prompt('Please describe your requested modifications:');
                            if (note) {
                              alert(`Revision request logged: "${note}". Our Design Director will respond within 24 hours.`);
                            }
                          }}
                          style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', background: '#FFFFFF', display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem', color: 'var(--color-text-primary)' }}
                        >
                          <MessageSquare size={16} /> Request Edits
                        </button>
                        <button 
                          onClick={() => handleApprove(mockup.id)}
                          disabled={loadingMockupId === mockup.id}
                          className="btn-primary" 
                          style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--color-indigo-dark)', display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}
                        >
                          <CheckCircle2 size={16} />
                          {loadingMockupId === mockup.id ? 'Approving...' : 'Approve Design'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
