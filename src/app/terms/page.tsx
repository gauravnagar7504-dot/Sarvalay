import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, AlertCircle, RefreshCw, FileCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Sarvalay Managed B2B Art',
  description: 'Understand the terms of service for clients and artists partnering with India\'s premier managed art infrastructure platform.',
};

export default function TermsPage() {
  const rules = [
    {
      icon: BookOpen,
      title: '1. Platform Agreement & Scope',
      desc: 'By using Sarvalay, you agree to these Terms. Sarvalay operates as a managed B2B Art Infrastructure Platform. We oversee projects end-to-end, meaning all communication, milestone payments, and design feedback are fully managed through the platform rather than directly between artists and clients.',
    },
    {
      icon: FileCheck,
      title: '2. Client Obligations & Specifications',
      desc: 'Clients must provide accurate site dimensions, surface characteristics, and lighting conditions. While our IVDE mockup engine generates photorealistic simulations, physical execution depends on the quality of surfaces. Access to the installation site must be provided as scheduled.',
    },
    {
      icon: RefreshCw,
      title: '3. Payment & Milestone Schedules',
      desc: 'All projects run on structured milestone payments (e.g. advance, draft review, and final handoff). Work commences only after the corresponding milestone payment is confirmed. Post-project completion requires signature sign-off before handover.',
    },
    {
      icon: AlertCircle,
      title: '4. Artist Placement & Safety Rules',
      desc: 'Sarvalay is fully responsible for artist onboarding and work standards. All artists are protected by strict occupational health norms. Scaffolding, paint materials, and safety gear are standard issues, and any modifications require direct support consent.',
    },
  ];

  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        {/* Header */}
        <section style={{ padding: '80px 24px 48px', background: 'rgba(179,18,23,0.03)', borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>Service Agreement</div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
              Terms &amp; <span className="gradient-text">Conditions</span>
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
              Effective Date: May 22, 2026. Please read this B2B operational contract carefully before booking a consultation or applying as an artist.
            </p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '48px', alignItems: 'flex-start' }} className="contact-grid">
            
            {/* Core Terms */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {rules.map((rule, idx) => {
                const Icon = rule.icon;
                return (
                  <div key={idx} className="glass-card" style={{ padding: '32px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ width: '40px', height: '40px', background: 'rgba(179,18,23,0.08)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-indigo)', flexShrink: 0 }}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '10px' }}>{rule.title}</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: '1.7' }}>{rule.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar quick notes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-card" style={{ padding: '32px', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Quick Reference</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', paddingLeft: '16px' }}>
                  <li><strong>Managed Model:</strong> No direct artist contact allowed outside Sarvalay mediation. This maintains professionalism and quality audits.</li>
                  <li><strong>Turnaround Timelines:</strong> AI mockups delivered in 48 hours; project completion times vary between 7 to 20 days.</li>
                  <li><strong>Standard Guarantee:</strong> 8-year comprehensive color and structural stability on indoor commercial installations.</li>
                  <li><strong>Cancellations:</strong> Governed fully by our milestone refund criteria.</li>
                </ul>
              </div>

              {/* Call to action */}
              <div style={{ padding: '32px', background: 'rgba(179,18,23,0.05)', borderRadius: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Need help?</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
                  For clarifications regarding our commercial contracts or artist placement, get in touch with our operations desk.
                </p>
                <Link href="/contact" className="btn-secondary" style={{ display: 'block', textAlign: 'center', fontSize: '0.85rem' }}>
                  <span>Speak with Operations</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
