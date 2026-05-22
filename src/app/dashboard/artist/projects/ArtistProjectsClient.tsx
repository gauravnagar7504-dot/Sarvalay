'use client';

import { useState, useTransition } from 'react';
import { Briefcase, Camera, Upload, CheckCircle2, Clock } from 'lucide-react';
import { addProgressPhoto } from '@/app/actions/operations';

interface ArtistProjectsClientProps {
  projects: any[];
}

export default function ArtistProjectsClient({ projects }: ArtistProjectsClientProps) {
  const [selectedProject, setSelectedProject] = useState<any>(projects[0] || null);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleUploadProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;
    if (!imageUrl || !description) {
      alert('Please fill out all fields.');
      return;
    }

    startTransition(async () => {
      const res = await addProgressPhoto(selectedProject.id, imageUrl, description);
      if (res.success && res.photo) {
        // Add photo to state locally
        const updatedProjects = projects.map(p => {
          if (p.id === selectedProject.id) {
            return {
              ...p,
              progressPhotos: [res.photo, ...(p.progressPhotos || [])]
            };
          }
          return p;
        });
        setSelectedProject(updatedProjects.find(p => p.id === selectedProject.id));
        setImageUrl('');
        setDescription('');
        alert('Progress photo uploaded successfully! It is now live on the client dashboard.');
      } else {
        alert('Failed to upload progress photo: ' + res.error);
      }
    });
  };

  if (projects.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ width: '64px', height: '64px', background: 'rgba(179,18,23,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <span style={{ fontSize: '24px' }}>🚧</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Project Assignments</h1>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '500px', margin: '0 auto 24px', lineHeight: '1.6' }}>
          No murals or art projects have been assigned to your profile yet. Once the Sarvalay admin aligns a client proposal with your style, your site brief will appear here!
        </p>
      </div>
    );
  }

  const progressPhotos = selectedProject?.progressPhotos || [];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>Project Assignments</h1>
          <p style={{ color: '#6B7280' }}>Track all assigned murals, deadlines, and upload site progress reports.</p>
        </div>
      </div>

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }} className="contact-grid">
        {/* Main Columns: Selected Project Details */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--color-indigo)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    CLIENT: {selectedProject.company}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '700', color: '#111827', marginTop: '4px' }}>
                    {selectedProject.title}
                  </h3>
                </div>
                <span 
                  style={{ 
                    background: selectedProject.status === 'COMPLETED' ? '#D1FAE5' : '#FEF3C7', 
                    color: selectedProject.status === 'COMPLETED' ? '#065F46' : '#D97706', 
                    padding: '4px 10px', 
                    borderRadius: '6px', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}
                >
                  {selectedProject.status.replace('_', ' ').toLowerCase()}
                </span>
              </div>
              
              <p style={{ fontSize: '0.88rem', color: '#6B7280', marginBottom: '16px', lineHeight: '1.6' }}>
                Assigned mural details. Base coats and grid coordinates are updated via progress logging. Project progress stands at {selectedProject.progress}%.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', borderTop: '1px solid #F3F4F6', paddingTop: '16px', fontSize: '0.82rem', color: '#6B7280' }}>
                <span>Client Contact: <span style={{ fontWeight: '600', color: '#111827' }}>{selectedProject.client?.name}</span></span>
                <span>Email: <span style={{ fontWeight: '600', color: '#111827' }}>{selectedProject.client?.email}</span></span>
              </div>
            </div>
          </div>

          {/* History of Progress Photos */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>
              Uploaded Progress History
            </h4>

            {progressPhotos.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: '#9CA3AF', fontStyle: 'italic' }}>
                No site updates posted yet.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                {progressPhotos.map((photo: any) => (
                  <div key={photo.id} style={{ borderRadius: '8px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                      <img src={photo.imageUrl} alt={photo.description} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    {photo.description && (
                      <div style={{ padding: '8px', fontSize: '0.75rem', color: '#4B5563', borderTop: '1px solid #E5E7EB' }}>
                        {photo.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </section>

        {/* Sidebar Dispatch / Progress Photo Upload Form */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Camera size={18} style={{ color: 'var(--color-indigo)' }} /> Post Progress Update
            </h2>

            <form onSubmit={handleUploadProgress} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Photo Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="e.g. /images/project_hotel_mural.png"
                  required
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Description / Caption</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Completed Base layout grids & prime shading coats"
                  required
                  rows={3}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                style={{
                  width: '100%',
                  background: 'var(--color-indigo)',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Upload size={16} /> Publish to Client
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
