'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

const artists = [
  { name: 'Priya Sharma', specialty: 'Mandala & Traditional Indian Art', city: 'Mumbai', tier: 'Premium', experience: '6 years', styles: ['Mandala', 'Heritage'], bio: 'Priya specialises in intricate mandala art and traditional Indian motifs, having completed 40+ commercial projects for luxury hotels across Mumbai and Goa.', img: '/images/artist_portrait_1.png' },
  { name: 'Rahul Verma', specialty: 'Abstract & Graffiti Art', city: 'Delhi', tier: 'Premium', experience: '8 years', styles: ['Abstract', 'Graffiti'], bio: 'Rahul brings contemporary street art energy to commercial spaces. His bold geometric abstracts have transformed offices for WeWork, Awfis, and multiple co-working chains.', img: '/images/artist_portrait_2.png' },
  { name: 'Ananya Krishnan', specialty: 'Watercolour & Botanical', city: 'Bengaluru', tier: 'Standard', experience: '4 years', styles: ['Botanical', 'Watercolour'], bio: 'Ananya creates ethereal watercolour-inspired murals with botanical and nature themes, perfect for wellness centres, spas, and boutique hospitality.', img: '/images/artist_portrait_1.png' },
  { name: 'Dev Malhotra', specialty: '3D Sculpture & Relief Art', city: 'Pune', tier: 'Premium', experience: '10 years', styles: ['Sculpture', '3D Relief'], bio: 'Dev is one of India\'s leading commercial sculptors, specialising in large-format 3D relief panels and mixed-media installations for corporate and hospitality clients.', img: '/images/artist_portrait_2.png' },
  { name: 'Kavya Nair', specialty: 'Geometric & Modern', city: 'Hyderabad', tier: 'Standard', experience: '3 years', styles: ['Geometric', 'Modern'], bio: 'Kavya creates bold, clean geometric murals that align with modern brand identities. Her work is particularly popular with tech startups and modern offices.', img: '/images/artist_portrait_1.png' },
  { name: 'Arjun Kapoor', specialty: 'Folk & Tribal Art', city: 'Jaipur', tier: 'Standard', experience: '5 years', styles: ['Folk', 'Tribal'], bio: 'Arjun draws from Rajasthani folk traditions to create vibrant, story-driven murals that celebrate India\'s cultural heritage in contemporary commercial settings.', img: '/images/artist_portrait_2.png' },
];

const styleFilters = ['All', 'Mandala', 'Abstract', 'Graffiti', 'Botanical', 'Geometric', 'Folk', 'Sculpture'];

export default function ArtistsPage() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? artists : artists.filter(a => a.styles.includes(filter));

  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        <section style={{ padding: '80px 24px 48px', textAlign: 'center', maxWidth: '740px', margin: '0 auto' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>Artist Network</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Meet Our <span className="gradient-text">Verified Artists</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '24px' }}>
            Every Sarvalay artist is verified, tiered, and professionally managed. All client inquiries go through Sarvalay — ensuring quality and accountability at every step.
          </p>
          <div className="badge badge-gold" style={{ display: 'inline-flex' }}>
            🔒 No direct artist contact — All projects managed by Sarvalay
          </div>
        </section>

        {/* Style Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '0 24px 48px', flexWrap: 'wrap' }}>
          {styleFilters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 18px', borderRadius: '20px', border: '1px solid', fontSize: '0.82rem', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease', background: filter === f ? 'var(--color-indigo)' : 'transparent', color: filter === f ? 'white' : 'var(--color-text-secondary)', borderColor: filter === f ? 'var(--color-indigo)' : 'rgba(0,0,0,0.12)' }}>
              {f}
            </button>
          ))}
        </div>

        {/* Artists Grid */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '32px' }}>
          {filtered.map(a => (
            <div key={a.name} className="glass-card" style={{ overflow: 'hidden', border: '1px solid var(--color-border)', borderRadius: '16px', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', display: 'flex', flexDirection: 'column' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-6px)';
                el.style.boxShadow = '0 24px 48px rgba(179,18,23,0.06)';
                const img = el.querySelector('.artist-zoom-img') as HTMLElement;
                if (img) img.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
                const img = el.querySelector('.artist-zoom-img') as HTMLElement;
                if (img) img.style.transform = 'scale(1)';
              }}>
              <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                <Image src={a.img} alt={`${a.name} — ${a.specialty}`} fill className="artist-zoom-img" style={{ objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                  <span className={`badge badge-${a.tier === 'Premium' ? 'gold' : 'indigo'}`} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>{a.tier}</span>
                </div>
              </div>
              <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '4px' }}>{a.name}</h3>
                <p style={{ color: 'var(--color-indigo-light)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '12px' }}>{a.specialty}</p>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>📍 {a.city}</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>⭐ {a.experience} experience</span>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: '1.65', marginBottom: '20px', flex: 1 }}>{a.bio}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
                  {a.styles.map(s => <span key={s} className="tag" style={{ borderRadius: '4px', fontSize: '0.68rem' }}>{s}</span>)}
                </div>
                <Link href="/consult" className="btn-gold" style={{ display: 'block', textAlign: 'center', padding: '12px', fontSize: '0.85rem', fontWeight: '600', borderRadius: '6px' }}>
                  Enquire via Sarvalay →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Artist CTA */}
        <div style={{ background: 'rgba(179,18,23,0.05)', borderTop: '1px solid rgba(179,18,23,0.1)', padding: '64px 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '12px' }}>
            Are You an Artist? <span className="gradient-text">Join Sarvalay</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
            Apply to join India&apos;s most trusted commercial art network. Get stable income, professional projects, and exposure to top brands.
          </p>
          <Link href="/apply" className="btn-primary"><span>Apply as an Artist →</span></Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
