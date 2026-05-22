'use client';
import { FileText, LayoutTemplate, Layers, Edit3 } from 'lucide-react';

export default function AdminContentPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Content Management</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Manage website copy, blog posts, and public portfolios.</p>
        </div>
        <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Edit3 size={18} /> New Post
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <ContentModuleCard icon={FileText} title="Blog & Articles" count="12 Published" />
        <ContentModuleCard icon={LayoutTemplate} title="Landing Pages" count="4 Pages Active" />
        <ContentModuleCard icon={Layers} title="Public Portfolio" count="28 Case Studies" />
      </div>

      <section className="glass-card" style={{ padding: '24px', marginTop: '32px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px' }}>Recent Content Edits</h2>
        <div style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '40px 0' }}>
          <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📝</div>
          <p>No recent content edits found.</p>
        </div>
      </section>
    </div>
  );
}

function ContentModuleCard({ icon: Icon, title, count }: any) {
  return (
    <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', transition: 'transform 0.2s' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(179,18,23,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-indigo)' }}>
        <Icon size={24} />
      </div>
      <div>
        <h3 style={{ fontWeight: '600', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>{title}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{count}</p>
      </div>
    </div>
  );
}
