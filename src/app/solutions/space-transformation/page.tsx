import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Space Transformation — Full Interior Art Overhaul | Sarvalay',
  description: 'Redesign the visual experience of your entire commercial space. Sarvalay provides complete art-driven interior transformations for hospitality and enterprise clients.',
};

export default function SpaceTransformationPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        <section style={{ padding: '100px 24px 80px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>Solutions</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '24px', lineHeight: '1.2' }}>
            Space <span className="gradient-text">Transformation</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
            The most comprehensive offering: a complete art-driven interior transformation. We redesign the visual experience of your entire space — from ceiling to floor, every surface becomes a canvas.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/consult" className="btn-gold" style={{ padding: '14px 32px', fontSize: '1rem' }}>
              Book Consultation <ArrowRight size={18} />
            </Link>
            <Link href="/solutions" className="btn-secondary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
              <ArrowLeft size={18} /> All Solutions
            </Link>
          </div>
        </section>

        <section style={{ padding: '40px 24px 100px', maxWidth: '1100px', margin: '0 auto' }}>
          <div className="glass-card" style={{ padding: '48px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '24px' }}>The Full Experience</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Unified Vision</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>We provide end-to-end art direction, ensuring that murals, sculptures, and framed works all speak the same cohesive visual language.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Multi-Artist Curation</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Large spaces require diverse talents. We deploy multiple specialized artists under the guidance of a single Sarvalay Project Director.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Phased Execution</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>For operational hotels and offices, we design phased execution schedules (often overnight) to minimize disruption to your business.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Brand Integration</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>We weave your corporate identity, color palettes, and brand story subtly into the artwork, creating a truly bespoke environment.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
