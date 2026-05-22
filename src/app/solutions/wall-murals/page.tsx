import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wall Murals — Commercial Art Solutions | Sarvalay',
  description: 'Transform your commercial space with hand-crafted, AI-designed wall murals by Sarvalay. Perfect for hotels, offices, and restaurants across India.',
};

export default function WallMuralsPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        <section style={{ padding: '100px 24px 80px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>Solutions</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '24px', lineHeight: '1.2' }}>
            Wall <span className="gradient-text">Murals</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>
            Transform bare walls into powerful brand statements with India's most skilled muralists. From intricate Indian heritage art to bold contemporary abstracts — every mural is custom-designed for your exact space.
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
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '24px' }}>What to Expect</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>1. AI Design Phase</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>We start with our proprietary IVDE engine, generating multiple photorealistic mockups of your actual wall before a single brush touches it.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>2. Artist Matching</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Based on your chosen style, we match your project with a verified, specialist muralist from our nationwide network.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>3. Managed Execution</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Our project managers oversee the entire installation process, ensuring quality, safety standards, and strict adherence to timelines.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '12px' }}>4. 8-Year Guarantee</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Every mural comes with our comprehensive 8-year guarantee covering both color fidelity and structural integrity.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
