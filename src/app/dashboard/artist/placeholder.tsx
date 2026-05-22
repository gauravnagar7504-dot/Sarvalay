'use client';

export default function ArtistPlaceholderPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', background: '#F3F4F6', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '1px solid #E5E7EB' }}>
          <span style={{ fontSize: '24px' }}>🎨</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>Module Coming Soon</h1>
        <p style={{ color: '#6B7280', maxWidth: '400px', margin: '0 auto' }}>This section of your creator toolkit is currently being built and will be available soon.</p>
      </div>
    </div>
  );
}
