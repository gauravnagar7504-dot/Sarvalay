import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maintenance & Restoration — India\'s Only Art Guarantee | Sarvalay',
  description: 'Protect your art investment. Every Sarvalay project comes with an 8-year comprehensive guarantee. We also offer maintenance subscriptions.',
};

export default function MaintenancePage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        <section style={{ padding: '100px 24px 80px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>Solutions</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '24px', lineHeight: '1.2' }}>
            Maintenance & <span className="gradient-text">Restoration</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
            Your art investment is protected. Every Sarvalay project comes with a 3-year color integrity guarantee and a 5-year structural guarantee. We also offer ongoing maintenance subscriptions for large properties.
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
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '24px' }}>The Sarvalay Promise</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Color Fading Guarantee</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>We use premium, UV-resistant commercial-grade paints and sealants. If a mural fades within 3 years, we restore it at zero cost.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Structural Integrity</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Installations and heavy 3D art pieces are backed by a 5-year structural guarantee covering fabrication and mounting hardware failure.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Priority Response</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Accidental damage in a busy hotel or office? Our maintenance subscribers get priority deployment of restoration artists within 72 hours.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Annual Inspections</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>For enterprise clients, we offer annual proactive inspection visits to clean, seal, and touch-up high-traffic art pieces.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
