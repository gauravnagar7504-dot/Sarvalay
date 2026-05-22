import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Process — 7-Step Art Execution Framework | Sarvalay',
  description: 'Sarvalay\'s proven 7-step art execution process: from free consultation and AI mockups to flawless on-site execution and guaranteed maintenance.',
};

const steps = [
  { num: '01', title: 'Free Consultation', duration: 'Day 1', description: 'A 30-minute strategy call with our project team. We understand your vision, brand identity, space requirements, and budget. Zero commitment, zero pressure.', deliverable: 'Project Brief Document' },
  { num: '02', title: 'AI Mockup Generation', duration: 'Day 1–2', description: 'Upload photos of your wall. Our IVDE engine generates 10 photorealistic design variations in under 3 minutes. Review, shortlist favorites, and request revisions.', deliverable: '10 Mockup Variations' },
  { num: '03', title: 'Site Visit & Survey', duration: 'Day 3–5', description: 'Our technical team visits your location for precise measurements, surface condition assessment, material compatibility checks, and logistical planning.', deliverable: 'Site Survey Report + Final Proposal' },
  { num: '04', title: 'Artist Assignment', duration: 'Day 5–7', description: 'We match your project with the ideal artist from our verified network based on style, tier, city proximity, and availability. You review the artist profile before confirmation.', deliverable: 'Artist Profile + Contract' },
  { num: '05', title: 'On-Site Execution', duration: 'Week 2–4', description: 'Our artist executes the project under Sarvalay\'s supervision. You receive daily photo progress updates. A Sarvalay project manager is on call throughout.', deliverable: 'Daily Progress Reports' },
  { num: '06', title: 'Quality Inspection', duration: 'Final Day', description: 'A rigorous QA inspection before any handover. We check for uniformity, edge quality, color accuracy, and finish. Your approval is mandatory before we close the project.', deliverable: 'QA Report + Sign-off' },
  { num: '07', title: 'Maintenance Guarantee', duration: 'Ongoing', description: 'Every Sarvalay project includes a 3-year color guarantee and 5-year structural guarantee. We also offer annual inspection subscriptions for large hospitality chains.', deliverable: '8-Year Comprehensive Guarantee Certificate' },
];

export default function ProcessPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        <section style={{ padding: '80px 24px 48px', textAlign: 'center', maxWidth: '740px', margin: '0 auto' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>Our Process</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            7 Steps to a <span className="gradient-text">Flawless Art Project</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Every Sarvalay engagement follows the same proven framework. No surprises. No delays. Guaranteed results.
          </p>
        </section>

        <div className="process-timeline" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 100px', position: 'relative' }}>
          {/* Timeline line */}
          <div className="timeline-line" style={{ position: 'absolute', left: '50%', top: '0', bottom: '0', width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(179,18,23,0.3), transparent)', transform: 'translateX(-50%)' }} />

          {steps.map((step, i) => (
            <div key={step.num} className="process-timeline-row" style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: '24px', alignItems: 'center', marginBottom: '48px' }}>
              {/* Left content (odd) or spacer (even) */}
              <div style={{ textAlign: 'right' }}>
                {i % 2 === 0 ? (
                  <div className="glass-card timeline-card" style={{ padding: '28px', textAlign: 'left' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '8px', fontWeight: '600', letterSpacing: '0.05em' }}>TIMELINE: {step.duration}</div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '12px' }}>{step.title}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: '16px' }}>{step.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'rgba(179,18,23,0.08)', borderRadius: '6px', border: '1px solid rgba(179,18,23,0.15)' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Deliverable:</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--color-indigo-light)', fontWeight: '500' }}>{step.deliverable}</span>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Center dot */}
              <div className="timeline-dot" style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-indigo), var(--color-indigo-dark))', border: '2px solid var(--color-indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700', color: 'white', flexShrink: 0, zIndex: 1 }}>
                  {step.num}
                </div>
              </div>

              {/* Right content (even) or spacer (odd) */}
              <div>
                {i % 2 === 1 ? (
                  <div className="glass-card timeline-card" style={{ padding: '28px', textAlign: 'left' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '8px', fontWeight: '600', letterSpacing: '0.05em' }}>TIMELINE: {step.duration}</div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '12px' }}>{step.title}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: '16px' }}>{step.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'rgba(179,18,23,0.08)', borderRadius: '6px', border: '1px solid rgba(179,18,23,0.15)' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Deliverable:</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--color-indigo-light)', fontWeight: '500' }}>{step.deliverable}</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/consult" className="btn-gold" style={{ fontSize: '1.05rem', padding: '16px 40px' }}>
              Start Your Project Today →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
