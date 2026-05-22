import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Art Installations — 3D Sculptural Art for Transformative Spaces | Sarvalay',
  description: 'Go beyond the wall with Sarvalay. Custom-fabricated 3D art installations in metal, wood, resin, and mixed media for commercial spaces.',
};

export default function ArtInstallationsPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        <section style={{ padding: '100px 24px 80px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>Solutions</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '24px', lineHeight: '1.2' }}>
            Art <span className="gradient-text">Installations</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
            Go beyond the wall. Our sculptural and 3D installations create immersive environments that become the defining visual identity of your space — from suspended kinetic sculptures to tactile relief art panels.
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
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '24px' }}>Our Approach</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Structural Engineering</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Safety is our priority. Every suspended or freestanding installation undergoes rigorous structural review and weight-bearing assessments.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Mixed Media Mastery</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>From forged metal and reclaimed wood to poured resin and kinetic electronics — our artists excel across diverse disciplines.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Site Integration</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>We coordinate with your architects, lighting designers, and HVAC teams to ensure the installation integrates perfectly with the built environment.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Turnkey Delivery</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>From initial concept sketches to final polishing on-site, Sarvalay manages the entire fabrication and installation pipeline.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
