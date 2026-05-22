'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

const team = [
  { name: 'Gagan Singh Hada', role: 'Founder & CEO', bio: 'Visionary entrepreneur building India\'s art infrastructure from the ground up. Former BD leader with deep roots in hospitality and commercial real estate sectors.', img: '/images/artist_portrait_2.png' },
  { name: 'Sakshi Gupta', role: 'Co-Founder & CTO', bio: 'Full-stack architect behind Sarvalay\'s technology platform — from the IVDE mockup engine to the client and admin dashboards. 7+ years in product engineering.', img: '/images/artist_portrait_1.png' },
];

const values = [
  { title: 'Managed, Not Marketplace', desc: 'We control every step of the art procurement journey — from design to installation to maintenance. No middlemen, no compromises.' },
  { title: 'Technology-First Art', desc: 'Our IVDE engine brings AI to Indian commercial art for the first time. See your transformation before we begin.' },
  { title: 'Artist Empowerment', desc: 'We provide artists with stable income, professional projects, and a platform to grow — while clients get guaranteed quality.' },
  { title: 'Guaranteed Accountability', desc: 'Every project has defined timelines, milestone payments, and a 3+5 year guarantee. No fine print.' },
];

const milestones = [
  { year: '2024', event: 'Sarvalay founded by Gagan Singh Hada in Mumbai' },
  { year: 'Q1 2025', event: 'First 5 hotel projects completed — Taj, Radisson partnerships formed' },
  { year: 'Q2 2025', event: 'Sakshi Gupta joins as CTO; IVDE engine development begins' },
  { year: 'Q3 2025', event: '50+ artist network onboarded across 8 cities' },
  { year: '2026', event: 'Platform launch — client & artist dashboards go live' },
];

export default function AboutPage() {
  return (
    <main>
      <title>About Sarvalay — India&apos;s B2B Art Infrastructure Platform</title>
      <meta name="description" content="Learn about Sarvalay's mission to build India's art infrastructure. Meet founders Gagan Singh Hada and Sakshi Gupta and our team." />
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        {/* Hero */}
        <section className="about-hero-grid" style={{ padding: '80px 24px 80px', maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '16px' }}>Our Story</div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '24px', lineHeight: '1.2' }}>
              Building India&apos;s <span className="gradient-text">Art Infrastructure</span>
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '20px' }}>
              Sarvalay was born from a simple frustration: India has thousands of world-class artists, and millions of commercial spaces that desperately need art — but no reliable, professional bridge between them.
            </p>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', marginBottom: '32px' }}>
              We built Sarvalay to be that infrastructure layer — a tech-enabled, operationally managed platform that controls client relationships, artist allocation, execution quality, and post-project maintenance under one accountable roof.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ padding: '20px', background: 'rgba(179,18,23,0.08)', border: '1px solid rgba(179,18,23,0.2)', borderRadius: '12px', flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-indigo-light)' }}>₹5,500Cr</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Indian Art Market TAM</div>
              </div>
              <div style={{ padding: '20px', background: 'rgba(179,18,23,0.08)', border: '1px solid rgba(179,18,23,0.2)', borderRadius: '12px', flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-indigo)' }}>₹20Cr</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Year 1–2 Revenue Target</div>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', height: '500px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(179,18,23,0.2)' }}>
            <Image src="/images/hero_mural_hotel.png" alt="Sarvalay — India's Art Infrastructure" fill style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(179,18,23,0.1), transparent)' }} />
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: '80px 24px', background: 'rgba(179,18,23,0.03)', borderTop: '1px solid rgba(179,18,23,0.1)', borderBottom: '1px solid rgba(179,18,23,0.1)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                What <span className="gradient-text">We Stand For</span>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
              {values.map((v, i) => (
                <div key={v.title} className="glass-card" style={{ padding: '28px' }}>
                  <div style={{ width: '40px', height: '40px', background: i % 2 === 0 ? 'rgba(179,18,23,0.15)' : 'rgba(179,18,23,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '16px' }}>
                    {['🎯', '🤖', '🎨', '🛡️'][i]}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '10px' }}>{v.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: '1.65' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founders */}
        <section style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-label" style={{ justifyContent: 'center', marginBottom: '12px' }}>Leadership</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>
              The <span className="gradient-text">Founders</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
            {team.map(member => (
              <div key={member.name} className="glass-card" style={{ display: 'flex', gap: '24px', padding: '32px', border: '1px solid var(--color-border)', borderRadius: '16px', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 20px 40px rgba(179,18,23,0.06)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
              >
                <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0, overflow: 'hidden', borderRadius: '50%' }}>
                  <Image src={member.img} alt={member.name} fill style={{ objectFit: 'cover', objectPosition: 'top', border: '3px solid rgba(179,18,23,0.25)' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '4px' }}>{member.name}</h3>
                  <div className="badge badge-indigo" style={{ marginBottom: '12px', display: 'inline-flex' }}>{member.role}</div>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: '1.65' }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section style={{ padding: '60px 24px 100px', maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>
              Our <span className="gradient-text">Journey</span>
            </h2>
          </div>
          <div style={{ position: 'relative', paddingLeft: '40px' }}>
            <div style={{ position: 'absolute', left: '10px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, var(--color-indigo), rgba(179, 18, 23, 0.05))' }} />
            {milestones.map((m, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: '32px' }}>
                <div style={{ position: 'absolute', left: '-35px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-indigo)', border: '2px solid var(--color-bg-primary)', top: '4px', boxShadow: '0 0 0 4px rgba(179,18,23,0.15)' }} />
                <div style={{ fontSize: '0.78rem', color: 'var(--color-indigo-light)', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '4px', textTransform: 'uppercase' }}>{m.year}</div>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: '1.65', fontWeight: '500' }}>{m.event}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
