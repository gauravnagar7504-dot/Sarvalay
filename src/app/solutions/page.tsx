import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions — Wall Murals, Art Installations & Space Transformation | Sarvalay',
  description: 'Explore Sarvalay\'s B2B art solutions: wall murals, 3D art installations, complete space transformation, and 3+5 year maintenance guarantee for hotels, offices, and restaurants.',
};

const solutions = [
  {
    id: 'wall-murals',
    title: 'Wall Murals',
    subtitle: 'Hand-Crafted. AI-Designed. Flawlessly Executed.',
    description: 'Transform bare walls into powerful brand statements with India\'s most skilled muralists. From intricate Indian heritage art to bold contemporary abstracts — every mural is custom-designed for your exact space.',
    benefits: ['AI-generated mockups before any work begins', 'Certified, vetted muralists only', 'All surfaces: concrete, drywall, brick, glass', 'Odor-free, child-safe materials', '3-year color guarantee'],
    useCases: ['Hotel lobbies & corridors', 'Corporate office feature walls', 'Restaurant accent walls', 'Retail & showroom spaces'],
    img: '/images/project_hotel_mural.png',
  },
  {
    id: 'art-installations',
    title: 'Art Installations',
    subtitle: '3D & Sculptural Art for Transformative Spaces',
    description: 'Go beyond the wall. Our sculptural and 3D installations create immersive environments that become the defining visual identity of your space — from suspended kinetic sculptures to tactile relief art panels.',
    benefits: ['Custom-fabricated in metal, wood, resin, and mixed media', 'Structural engineering review included', 'Installation by certified teams', 'Weight-bearing assessments provided', '5-year structural guarantee'],
    useCases: ['Hotel foyers & atriums', 'Office reception areas', 'Mall common areas', 'Luxury residential lobbies'],
    img: '/images/project_office_mural.png',
  },
  {
    id: 'space-transformation',
    title: 'Space Transformation',
    subtitle: 'Full Interior Art Overhaul for Complete Immersion',
    description: 'The most comprehensive offering: a complete art-driven Interior transformation. We redesign the visual experience of your entire space — from ceiling to floor, every surface becomes a canvas.',
    benefits: ['End-to-end art direction & project management', 'Multiple artists, multiple mediums', 'Brand identity integration', 'Phased execution to minimize disruption', 'Dedicated project manager throughout'],
    useCases: ['Full restaurant redesigns', 'Hotel wing & floor transformations', 'Corporate campus art programs', 'Branded experience centers'],
    img: '/images/project_restaurant_mural.png',
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Restoration',
    subtitle: 'India\'s Only 3+5 Year Art Guarantee',
    description: 'Your art investment is protected. Every Sarvalay project comes with a 3-year color integrity guarantee and a 5-year structural guarantee. We also offer ongoing maintenance subscriptions for large properties.',
    benefits: ['3-year color fading guarantee', '5-year structural integrity guarantee', 'Annual inspection visits', 'Touch-up & restoration services', 'Priority response for damage events'],
    useCases: ['Hospitality chains (multi-property)', 'Corporate campuses', 'Aged art restoration', 'Pre-sale property upgrades'],
    img: '/images/hero_mural_hotel.png',
  },
];

export default function SolutionsPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        {/* Header */}
        <section style={{ padding: '80px 24px 60px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>Our Solutions</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Art Services Built for <span className="gradient-text">India&apos;s Commercial Sector</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.7' }}>
            Four specialized solutions. One managed platform. Every project backed by guaranteed quality and timelines.
          </p>
        </section>

        {/* Solution Cards */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 100px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {solutions.map((sol, i) => (
            <div key={sol.id} id={sol.id} className="solutions-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', direction: i % 2 === 1 ? 'rtl' : 'ltr' }}>
              <div style={{ direction: 'ltr' }}>
                <span className="badge badge-indigo" style={{ marginBottom: '16px', display: 'inline-flex' }}>0{i + 1}</span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>{sol.title}</h2>
                <p style={{ color: 'var(--color-indigo)', fontSize: '0.9rem', fontWeight: '500', marginBottom: '16px' }}>{sol.subtitle}</p>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>{sol.description}</p>
                <div className="solutions-inner-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
                  <div>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '12px' }}>Benefits</h4>
                    {sol.benefits.map(b => (
                      <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                        <CheckCircle size={14} style={{ color: 'var(--color-indigo)', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>{b}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '12px' }}>Use Cases</h4>
                    {sol.useCases.map(u => (
                      <div key={u} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ color: 'var(--color-indigo)', fontSize: '0.75rem', marginTop: '3px' }}>▸</span>
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>{u}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="/consult" className="btn-primary"><span>Get a Quote <ArrowRight size={16} /></span></Link>
              </div>
              <div style={{ direction: 'ltr', position: 'relative', height: '420px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(179,18,23,0.2)' }}>
                <Image src={sol.img} alt={sol.title} fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(255,255,255,0.4) 0%, transparent 60%)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
