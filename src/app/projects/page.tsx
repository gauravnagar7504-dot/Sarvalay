'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  { slug: 'taj-lobby-mumbai', title: 'The Taj Lobby Transformation', category: 'Hotels', location: 'Mumbai', style: 'Mandala & Heritage Art', area: '1,200 sq ft', duration: '3 weeks', budget: '₹4.2L', img: '/images/project_hotel_mural.png', client: 'Taj Hotels & Resorts', desc: 'A sweeping heritage-inspired mural spanning the entire lobby back wall, featuring intricate peacock motifs and lotus mandala patterns in gold and teal.' },
  { slug: 'wework-bengaluru', title: 'WeWork Creative Hub', category: 'Offices', location: 'Bengaluru', style: 'Abstract Geometric', area: '800 sq ft', duration: '2 weeks', budget: '₹2.8L', img: '/images/project_office_mural.png', client: 'WeWork India', desc: 'A bold geometric abstract mural with mandala-inspired patterns in indigo and gold energizing the main collaboration zone.' },
  { slug: 'spice-route-delhi', title: 'Spice Route Restaurant', category: 'Restaurants', location: 'New Delhi', style: 'Indian Streetscape', area: '600 sq ft', duration: '2 weeks', budget: '₹2.1L', img: '/images/project_restaurant_mural.png', client: 'Spice Route Group', desc: 'A vibrant depiction of an Indian street market — rickshaws, marigolds, and street food culture — bringing warmth and authenticity to the dining experience.' },
  { slug: 'radisson-corridor', title: 'Radisson Blu Corridors', category: 'Hotels', location: 'Hyderabad', style: 'Art Nouveau Heritage', area: '950 sq ft', duration: '2.5 weeks', budget: '₹3.5L', img: '/images/project_hotel_mural.png', client: 'Radisson Blu', desc: 'Elegant Art Nouveau mandala art along hotel corridors creating a cohesive journey of artisanal Indian craftsmanship.' },
  { slug: 'itc-office-chennai', title: 'ITC Corporate Campus', category: 'Offices', location: 'Chennai', style: 'Brand Identity Art', area: '1,100 sq ft', duration: '3 weeks', budget: '₹3.9L', img: '/images/project_office_mural.png', client: 'ITC Limited', desc: 'A multi-panel brand story mural integrating ITC\'s heritage and sustainability mission into a stunning visual narrative.' },
  { slug: 'ministry-of-food', title: 'Ministry of Food & Spirits', category: 'Restaurants', location: 'Pune', style: 'Contemporary Folk', area: '500 sq ft', duration: '12 days', budget: '₹1.8L', img: '/images/project_restaurant_mural.png', client: 'Ministry Group', desc: 'Bold folk art patterns mixed with modern typography creating an Instagrammable bar wall that drives organic social reach.' },
];

const filters = ['All', 'Hotels', 'Offices', 'Restaurants'];

export default function ProjectsPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        <section style={{ padding: '80px 24px 48px', textAlign: 'center', maxWidth: '740px', margin: '0 auto' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>Our Work</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Projects That <span className="gradient-text">Define Spaces</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Every project is a collaboration between our artists, clients, and technology — executed with guaranteed quality.
          </p>
        </section>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '0 24px 48px', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)} style={{ padding: '10px 24px', borderRadius: '24px', border: '1px solid', fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease', background: active === f ? 'var(--color-indigo)' : 'transparent', color: active === f ? 'white' : 'var(--color-text-secondary)', borderColor: active === f ? 'var(--color-indigo)' : 'rgba(0,0,0,0.12)' }}>
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {filtered.map(p => (
            <Link key={p.slug} href={`/projects/${p.slug}`} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ overflow: 'hidden', height: '100%', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 80px rgba(0,0,0,0.35)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ position: 'relative', height: '260px' }}>
                  <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)' }} />
                  <span className="tag" style={{ position: 'absolute', top: '12px', left: '12px' }}>{p.category}</span>
                  <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: '600', color: 'white', marginBottom: '4px' }}>{p.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>{p.client} · {p.location}</p>
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '16px' }}>{p.desc}</p>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {[{ label: 'Area', val: p.area }, { label: 'Duration', val: p.duration }, { label: 'Investment', val: p.budget }].map(({ label, val }) => (
                      <div key={label}>
                        <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>{label}</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
