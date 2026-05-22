'use client';
import { Upload, Star, Eye, MessageSquare, Plus } from 'lucide-react';
import Image from 'next/image';

export default function ArtistPortfolioPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>Showcases & Portfolio</h1>
          <p style={{ color: '#6B7280' }}>Manage the public case studies and artworks displayed to high-end B2B clients.</p>
        </div>
        <button style={{ background: '#111827', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Upload size={16} /> Upload New Artwork
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px' }}>
        {/* Main Columns: Grid of Artworks */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <PortfolioCard 
              image="/images/project_hotel_mural.png" 
              title="Traditional Mandala Lobby Fusion"
              type="Wall Mural"
              views="1,240"
              likes="420"
            />
            <PortfolioCard 
              image="/images/project_office_mural.png" 
              title="Tech Corridor Geometric Grid"
              type="3D Installation"
              views="890"
              likes="280"
            />
          </div>

        </section>

        {/* Sidebar: Feedback / Ratings */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>Client Reviews</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { client: 'WeWork India', text: 'Stunning precision on the glass geometric overlays. Our coworking members love it.', rating: 5 },
                { client: 'BlueBottle Mumbai', text: 'Completed the cafe street wall overnight. Clean execution and zero mess.', rating: 5 }
              ].map((rev, idx) => (
                <div key={idx} style={{ paddingBottom: '16px', borderBottom: idx === 0 ? '1px solid #F3F4F6' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={12} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                    ))}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#4B5563', lineHeight: '1.4', marginBottom: '6px' }}>&quot;{rev.text}&quot;</p>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#111827' }}>— {rev.client}</span>
                </div>
              ))}
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}

function PortfolioCard({ image, title, type, views, likes }: any) {
  return (
    <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
      <div style={{ width: '100%', aspectRatio: '16/10', position: 'relative', background: '#F3F4F6' }}>
        <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '20px' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{type}</span>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: '700', color: '#111827', marginTop: '4px', marginBottom: '12px' }}>{title}</h3>
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: '#6B7280', borderTop: '1px solid #F3F4F6', paddingTop: '12px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={14} /> {views} Views</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageSquare size={14} /> {likes} Recommends</span>
        </div>
      </div>
    </div>
  );
}
