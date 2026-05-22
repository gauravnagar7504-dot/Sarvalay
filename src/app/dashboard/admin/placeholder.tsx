'use client';

export default function AdminPlaceholderPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', background: 'rgba(179,18,23,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <span style={{ fontSize: '24px' }}>🚧</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Page Under Construction</h1>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '400px', margin: '0 auto' }}>This module is currently being built by the engineering team and will be available in Phase 2.</p>
      </div>
    </div>
  );
}
