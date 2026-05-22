'use client';

import { useState } from 'react';
import { Search, Plus, X, Briefcase, User, IndianRupee, Layers } from 'lucide-react';
import { createProject, assignArtistToProject, updateProjectProgress } from '@/app/actions/operations';
import { ProjectStatus } from '@prisma/client';

interface ProjectsClientProps {
  initialProjects: any[];
  artists: any[];
}

export default function ProjectsClient({ initialProjects, artists }: ProjectsClientProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // New Project Form State
  const [form, setForm] = useState({
    title: '',
    company: '',
    clientName: '',
    clientEmail: '',
    artistId: '',
    advanceAmount: 150000,
  });

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await createProject({
      title: form.title,
      company: form.company,
      clientName: form.clientName,
      clientEmail: form.clientEmail,
      artistId: form.artistId || undefined,
      advanceAmount: Number(form.advanceAmount),
    });
    setSubmitting(true);
    if (res.success) {
      alert('Project spawned and 50-30-20 Invoices generated automatically!');
      setShowModal(false);
      window.location.reload();
    } else {
      alert('Error spawning project: ' + res.error);
      setSubmitting(false);
    }
  };

  const handleAssignArtist = async (projectId: string, artistId: string) => {
    const res = await assignArtistToProject(projectId, artistId || null);
    if (res.success) {
      setProjects(projects.map(p => p.id === projectId ? { ...p, artistId, artist: artists.find(a => a.id === artistId) } : p));
      alert('Artist assigned successfully!');
    } else {
      alert('Error assigning artist: ' + res.error);
    }
  };

  const handleProgressChange = async (projectId: string, newProgress: number) => {
    let status: ProjectStatus = ProjectStatus.EXECUTING;
    if (newProgress >= 100) {
      status = ProjectStatus.COMPLETED;
    } else if (newProgress >= 80) {
      status = ProjectStatus.QA_CHECK;
    } else if (newProgress === 0) {
      status = ProjectStatus.MOCKUP_PHASE;
    }
    
    const res = await updateProjectProgress(projectId, newProgress, status);
    if (res.success) {
      setProjects(projects.map(p => p.id === projectId ? { ...p, progress: newProgress, status } : p));
    } else {
      alert('Error updating progress: ' + res.error);
    }
  };

  const filteredProjects = projects.filter((p) => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Project Execution</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Manage all ongoing and completed space transformations across India.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="btn-primary" 
          style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer' }}
        >
          <Plus size={18} /> Spawn New Project
        </button>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        {/* Search */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '360px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} 
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Project & Company</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Client User</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Artist Match</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Pipeline Status</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Progress Bar</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    No projects found. Use &quot;Spawn New Project&quot; to begin.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>{project.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{project.company}</div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>{project.client?.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{project.client?.email}</div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <select
                        value={project.artistId || ''}
                        onChange={(e) => handleAssignArtist(project.id, e.target.value)}
                        style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#fff', fontSize: '0.82rem', cursor: 'pointer', outline: 'none' }}
                      >
                        <option value="">Unassigned</option>
                        {artists.map((art) => (
                          <option key={art.id} value={art.id}>{art.name} ({art.artistProfile?.tier || 'Pro'})</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span className={`badge ${
                        project.status === 'COMPLETED' ? 'badge-gold' : 
                        project.status === 'QA_CHECK' ? 'badge-indigo' : 
                        'badge-indigo'
                      }`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '16px', minWidth: '240px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ flex: 1, height: '8px', background: 'rgba(179,18,23,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${project.progress}%`, height: '100%', background: 'var(--color-indigo)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
                        </div>
                        <input 
                          type="number" 
                          min="0" 
                          max="100" 
                          value={project.progress} 
                          onChange={(e) => handleProgressChange(project.id, Number(e.target.value))}
                          style={{ width: '54px', padding: '4px 6px', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '0.78rem', textAlign: 'center', fontWeight: 'bold' }}
                        />
                        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>%</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* manual creation Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, padding: '20px'
        }}>
          <div className="glass-card" style={{
            width: '100%', maxWidth: '500px', background: '#fff',
            borderRadius: '16px', padding: '32px', boxShadow: '0 24px 80px rgba(0,0,0,0.15)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', top: '24px', right: '24px', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '6px' }}>Spawn Project</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>Creates a new active B2B contract and auto-calculates milestones.</p>

            <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Project Title *</label>
                <input 
                  type="text" required placeholder="Taj Lobby Hand-painted Murals" className="input-field"
                  value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Client Company *</label>
                <input 
                  type="text" required placeholder="Taj Hotels Group" className="input-field"
                  value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Client User Name *</label>
                  <input 
                    type="text" required placeholder="Gaurav Modi" className="input-field"
                    value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Client User Email *</label>
                  <input 
                    type="email" required placeholder="gaurav@taj.com" className="input-field"
                    value={form.clientEmail} onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Assign Initial Artist</label>
                  <select 
                    className="input-field" value={form.artistId} onChange={(e) => setForm({ ...form, artistId: e.target.value })}
                  >
                    <option value="">Choose later</option>
                    {artists.map((art) => (
                      <option key={art.id} value={art.id}>{art.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>50% Advance Value *</label>
                  <input 
                    type="number" required placeholder="150000" className="input-field"
                    value={form.advanceAmount} onChange={(e) => setForm({ ...form, advanceAmount: Number(e.target.value) })}
                  />
                </div>
              </div>

              <button 
                type="submit" disabled={submitting} className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem', cursor: 'pointer', marginTop: '10px' }}
              >
                <span>{submitting ? 'Spawning Contract...' : 'Spawn & Invoice Client'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
