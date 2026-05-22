'use client';
import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Sparkles, Shield, Clock, MapPin, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const processSteps = [
  { num: '01', title: 'Consultation', desc: 'Free 30-min strategy call to understand your vision, space, and brand identity.' },
  { num: '02', title: 'AI Mockups', desc: 'Upload your wall photo. Our IVDE engine generates 10 design variations in under 3 minutes.' },
  { num: '03', title: 'Site Visit', desc: 'Our team visits your location for precise measurements and surface assessment.' },
  { num: '04', title: 'Artist Assignment', desc: 'We match your project with the ideal verified artist from our curated network.' },
  { num: '05', title: 'Execution', desc: 'Flawless on-site execution with daily progress updates and quality checkpoints.' },
  { num: '06', title: 'Quality Check', desc: 'Rigorous QA inspection before handover. Your approval is mandatory.' },
  { num: '07', title: 'Maintenance', desc: '3-year color guarantee + 5-year structural guarantee included with every project.' },
];

const projects = [
  { title: 'The Taj Lobby Transformation', category: 'Hotels', location: 'Mumbai', img: '/images/project_hotel_mural.png', style: 'Mandala & Heritage Art' },
  { title: 'WeWork Creative Hub', category: 'Offices', location: 'Bengaluru', img: '/images/project_office_mural.png', style: 'Abstract Geometric' },
  { title: 'Spice Route Restaurant', category: 'Restaurants', location: 'Delhi', img: '/images/project_restaurant_mural.png', style: 'Indian Streetscape' },
];

const artists = [
  { name: 'Priya Sharma', specialty: 'Mandala & Traditional', city: 'Mumbai', tier: 'Premium', experience: '6 yrs', img: '/images/artist_portrait_1.png' },
  { name: 'Rahul Verma', specialty: 'Abstract & Graffiti', city: 'Delhi', tier: 'Premium', experience: '8 yrs', img: '/images/artist_portrait_2.png' },
];

const testimonials = [
  { name: 'Rajesh Mehta', role: 'GM, Radisson Blu', text: 'Sarvalay completely transformed our lobby. The AI mockup process was incredibly reassuring — we saw exactly what we\'d get before a single brushstroke.', stars: 5 },
  { name: 'Nisha Kapoor', role: 'Head of Design, WeWork India', text: 'The professionalism is unmatched. Guaranteed timelines, vetted artists, and stunning results. This is the only way to do commercial art.', stars: 5 },
  { name: 'Amit Singhania', role: 'Director, Spice Route Group', text: 'Three restaurants transformed in 6 months. Sarvalay\'s managed model took all the chaos out of art procurement.', stars: 5 },
];

const stats = [
  { value: '50+', label: 'Verified Artists', icon: Users },
  { value: '8-Year', label: 'Guarantee', icon: Shield },
  { value: '48h', label: 'Mockup Delivery', icon: Clock },
  { value: 'Pan India', label: 'Execution Reach', icon: MapPin },
];

const logos = ['Taj Hotels', 'Radisson Blu', 'WeWork', 'Marriott', 'ITC Hotels', 'Godrej Properties', 'Brigade Group', 'Colliers'];export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeTesti, setActiveTesti] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, [isDragging]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const filters = ['All', 'Hotels', 'Offices', 'Restaurants'];
  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <main>
      <Navbar />
      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#FAF8F5', overflow: 'hidden' }}>
        {/* Background Image anchored to the right */}
        <div className="hero-img-container" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '65%', zIndex: 0 }}>
          <Image src="/images/hero_mural_hotel.png" alt="Luxury hotel lobby with Sarvalay wall mural" fill style={{ objectFit: 'cover', objectPosition: 'center right' }} priority />
          {/* Gradient fade from left to right */}
          <div className="hero-gradient-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #FAF8F5 0%, rgba(250,248,245,0.9) 30%, transparent 100%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1280px', margin: '0 auto', padding: '120px 24px 80px', width: '100%' }}>
          <div style={{ maxWidth: '650px' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: '400', lineHeight: '1.15', color: '#1a1a1a', marginBottom: '24px', letterSpacing: '-0.01em' }}>
              We Transform<br />
              Commercial Spaces<br />
              Through<br />
              <span style={{ color: 'var(--color-indigo-dark)' }}>Curated Art &amp;<br />Flawless Execution</span>
            </h1>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#4a4a4a', marginBottom: '40px', maxWidth: '480px', fontWeight: '500' }}>
              Sarvalay partners with businesses to craft immersive, meaningful spaces through bespoke art, managed end-to-end with precision, creativity, and care.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/consult" className="btn-primary" style={{ fontSize: '0.95rem', padding: '14px 28px', backgroundColor: 'var(--color-indigo-dark)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '500' }}>
                Book Consultation
              </Link>
              <Link href="/projects" className="btn-secondary" style={{ fontSize: '0.95rem', padding: '14px 28px', color: 'var(--color-indigo-dark)', border: '1px solid rgba(142, 14, 18, 0.4)', backgroundColor: 'transparent', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
                <span>Explore Projects</span> <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND LOGOS ── */}
      <section style={{ background: 'rgba(0,0,0,0.01)', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '28px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px', padding: '0 24px', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: 'var(--color-text-muted)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Trusted by India&apos;s leading brands</span>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="marquee-track" style={{ gap: '48px', alignItems: 'center' }}>
            {[...logos, ...logos].map((logo, i) => (
              <span key={i} style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', padding: '4px 0', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM METRICS/STATS ── */}
      <section style={{ padding: '80px 24px 40px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="glass-card" style={{ padding: '32px 24px', textAlign: 'center', border: '1px solid var(--color-border)', borderRadius: '16px', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 20px 40px rgba(179,18,23,0.06)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
              >
                <div style={{ width: '48px', height: '48px', background: 'rgba(179,18,23,0.06)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-indigo)', margin: '0 auto 16px' }}>
                  <Icon size={22} />
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '80px 24px 100px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>Our Process</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            From Blank Wall to Masterpiece —<br /><span className="gradient-text">In 7 Precise Steps</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto' }}>
            Every Sarvalay project follows the same proven process. No surprises, guaranteed quality.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {processSteps.map((step, i) => (
            <div key={step.num} className="glass-card" style={{ padding: '28px', transition: 'all 0.3s ease', cursor: 'default' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 20px 60px rgba(179,18,23,0.05)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, var(--color-indigo), var(--color-indigo-dark))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.8rem', fontWeight: '700', color: 'white' }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '6px' }}>{step.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── IVDE MOCKUP DEMO ── */}
      <section style={{ padding: '80px 24px', background: 'rgba(179,18,23,0.02)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="ivde-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            <div>
              <div className="section-label" style={{ marginBottom: '16px' }}>IVDE Engine</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '20px' }}>
                See Your Wall Transformed<br /><span className="gradient-text">Before We Begin</span>
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>
                Our AI-powered IVDE (Intelligent Visual Design Engine) generates 10 photorealistic mockup variations of your wall — in under 3 minutes. Upload a photo. See the future.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {['10 unique design variations per upload', 'Photorealistic lighting & texture matching', 'Interactive before/after comparison', 'Save favorites to your dashboard'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-indigo)', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/consult" className="btn-primary">
                <span>Try IVDE Free →</span>
              </Link>
            </div>

            {/* Before/After Slider */}
            <div
              ref={sliderRef}
              className="before-after-container"
              style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '400px', cursor: 'ew-resize', border: '1px solid var(--color-border)' }}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
            >
              <Image src="/images/mockup_after.png" alt="After: AI-generated wall mural mockup" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
                <Image src="/images/mockup_before.png" alt="Before: Plain wall" fill style={{ objectFit: 'cover' }} />
              </div>
              {/* Slider line */}
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${sliderPos}%`, width: '2px', background: 'var(--color-bg-card)', transform: 'translateX(-50%)', zIndex: 10, boxShadow: '0 0 10px rgba(0,0,0,0.08)' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '40px', height: '40px', background: 'var(--color-bg-card)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: '14px', fontWeight: '700', color: '#111827' }}>
                  <ChevronLeft size={12} /><ChevronRight size={12} />
                </div>
              </div>
              <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 11 }}>
                <span className="badge badge-indigo">Before</span>
              </div>
              <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 11 }}>
                <span className="badge badge-gold">After (AI)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section style={{ padding: '100px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '12px' }}>Our Work</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: '700', color: 'var(--color-text-primary)' }}>
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: '8px 18px', borderRadius: '20px', border: '1px solid', fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease', background: activeFilter === f ? 'var(--color-indigo)' : 'transparent', color: activeFilter === f ? 'white' : 'var(--color-text-secondary)', borderColor: activeFilter === f ? 'var(--color-indigo)' : 'rgba(0,0,0,0.08)' }}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {filtered.map(p => (
            <Link key={p.title} href={`/projects/${p.title.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ overflow: 'hidden', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 80px rgba(0,0,0,0.06)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ position: 'relative', height: '240px' }}>
                  <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 60%)' }} />
                  <span className="tag" style={{ position: 'absolute', top: '12px', left: '12px' }}>{p.category}</span>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '6px' }}>{p.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>{p.location} · {p.style}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/projects" className="btn-secondary"><span>View All Projects →</span></Link>
        </div>
      </section>

      {/* ── ARTISTS ── */}
      <section style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.02)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-label" style={{ justifyContent: 'center', marginBottom: '12px' }}>Artist Network</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: '700', color: 'var(--color-text-primary)' }}>
              Meet Our <span className="gradient-text">Verified Artists</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '800px', margin: '0 auto 32px' }}>
            {artists.map(a => (
              <div key={a.name} className="glass-card" style={{ overflow: 'hidden', transition: 'all 0.3s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
                <div style={{ position: 'relative', height: '200px' }}>
                  <Image src={a.img} alt={`${a.name}, ${a.specialty} artist`} fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 50%)' }} />
                  <span className="badge badge-gold" style={{ position: 'absolute', top: '12px', right: '12px' }}>{a.tier}</span>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '4px' }}>{a.name}</h3>
                  <p style={{ color: 'var(--color-indigo-light)', fontSize: '0.85rem', marginBottom: '8px' }}>{a.specialty}</p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>📍 {a.city}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>⭐ {a.experience}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/artists" className="btn-secondary"><span>View All Artists →</span></Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '100px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '12px' }}>Testimonials</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '700', color: 'var(--color-text-primary)' }}>
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>
        <div className="glass-card" style={{ padding: '48px', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '24px' }}>
            {Array.from({ length: testimonials[activeTesti].stars }).map((_, i) => (
              <Star key={i} size={18} fill="var(--color-indigo)" color="var(--color-indigo)" />
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--color-text-primary)', lineHeight: '1.7', marginBottom: '32px' }}>
            &ldquo;{testimonials[activeTesti].text}&rdquo;
          </p>
          <div>
            <div style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>{testimonials[activeTesti].name}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{testimonials[activeTesti].role}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTesti(i)} style={{ width: i === activeTesti ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === activeTesti ? 'var(--color-indigo)' : 'rgba(0,0,0,0.08)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
