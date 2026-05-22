import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HelpCircle, RefreshCw, XCircle, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy — Sarvalay Managed Art',
  description: 'Review Sarvalay\'s milestone-based refund policy and 8-year comprehensive satisfaction guarantee.',
};

export default function RefundPage() {
  const points = [
    {
      icon: ShieldCheck,
      title: '8-Year Comprehensive Guarantee',
      desc: 'All Sarvalay projects come with a 3-year absolute color fade guarantee and an additional 5-year structural adhesion guarantee (preventing cracks/peeling). If any defects arise from raw materials or workmanship during this period, we will perform complete restoration completely free of charge.',
    },
    {
      icon: RefreshCw,
      title: 'Milestone Payout Safeguards',
      desc: 'Our projects run on standard progressive milestone gates. Once a milestone is completed and signed off (e.g. initial layout, primary paint block), that portion is non-refundable as it covers wages and high-grade materials. Funds for subsequent, un-started milestones are 100% refundable if the project is suspended.',
    },
    {
      icon: XCircle,
      title: 'Cancellation & Rescheduling',
      desc: 'You can cancel a project up to 48 hours before the scheduled on-site surface preparation to receive a full refund of your booking advance. Cancellations within 48 hours incur a nominal mobilization fee of 10% of the milestone value to compensate assigned artists and site coordinators.',
    },
  ];

  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        {/* Header */}
        <section style={{ padding: '80px 24px 48px', background: 'rgba(179,18,23,0.03)', borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>Client Satisfaction</div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
              Refund &amp; <span className="gradient-text">Cancellation Policy</span>
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
              Last updated: May 22, 2026. At Sarvalay, we stand behind the precision of our operations and the talent of our curated artist network.
            </p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: '80px 24px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {points.map((pt, idx) => {
              const Icon = pt.icon;
              return (
                <div key={idx} className="glass-card" style={{ padding: '32px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(179,18,23,0.08)', border: '1px solid rgba(179,18,23,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-indigo)', flexShrink: 0 }}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '10px' }}>{pt.title}</h3>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>{pt.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Special Resolution Process */}
          <div className="glass-card" style={{ marginTop: '48px', padding: '36px', border: '1px solid var(--color-border)', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(179,18,23,0.02), rgba(179,18,23,0.01))' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <HelpCircle size={22} style={{ color: 'var(--color-indigo)' }} />
              Satisfaction Resolution Process
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.75', marginBottom: '20px' }}>
              If you are ever unsatisfied with a draft layout or an active paint step, you can flag it instantly via your Client Dashboard. A site operations supervisor will visit the venue within 24 hours to review the execution against the agreed IVDE AI mockup. If a variance of more than 5% in styling or layout mapping is found, we will re-work the section immediately at our cost.
            </p>
            <div style={{ borderTop: '1px solid rgba(179,18,23,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: '500' }}>Questions about a billing transaction?</span>
              <Link href="/contact" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
                <span>Connect with Billing</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
