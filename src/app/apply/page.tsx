'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Upload, CheckCircle, Briefcase, ShieldCheck, Award, ArrowRight, Star, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { submitArtistApplication } from '@/app/actions/operations';


export default function ArtistApplyPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    style: '',
    experience: '',
    portfolio: '',
    bio: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitArtistApplication({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      style: formData.style,
      experience: formData.experience,
      portfolio: formData.portfolio,
      bio: formData.bio,
    });
    setSubmitting(false);
    if (res.success) {
      setSubmitted(true);
    } else {
      alert("Failed to submit application: " + res.error);
    }
  };

  const benefits = [
    {
      icon: Briefcase,
      title: 'Stable B2B Income',
      desc: 'No more haggling with clients. Sarvalay guarantees standard milestone payouts and professional contracts on every single commercial project.',
    },
    {
      icon: ShieldCheck,
      title: 'Managed Logistics',
      desc: 'We handle the site measurements, surface preparation, client approvals, and legalities so you can focus 100% on your artistic creation.',
    },
    {
      icon: Award,
      title: 'Premium Brand Portfolios',
      desc: 'Transform premium locations for leading B2B brands like Taj Hotels, Radisson, WeWork, and major corporate offices across India.',
    },
    {
      icon: Star,
      title: 'Dedicated Artist Support',
      desc: 'Access professional photography, dynamic portfolio marketing, and advanced tools like our IVDE AI engine to pitch designs easily.',
    },
  ];

  const steps = [
    { num: '01', title: 'Submit Portfolio', desc: 'Fill out this application form with your past work, specialty, and experience.' },
    { num: '02', title: 'Portfolio Review', desc: 'Our curation board reviews your style and rates it into standard or premium tiers.' },
    { num: '03', title: 'Onboarding Call', desc: 'A quick interview with our team to align on B2B standards, schedules, and pricing.' },
    { num: '04', title: 'First Project Assignment', desc: 'Get matched with commercial spaces in your city and start painting your first masterpiece.' },
  ];

  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        {/* Hero */}
        <section style={{ padding: '80px 24px 60px', background: 'linear-gradient(135deg, rgba(179,18,23,0.04), rgba(179,18,23,0.02))', borderBottom: '1px solid var(--color-border)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(179,18,23,0.05) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>Artist Application</div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '20px', lineHeight: '1.15' }}>
              Paint the Future of <br />
              <span className="gradient-text">Commercial Spaces</span>
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.7', maxWidth: '640px', margin: '0 auto 32px', fontWeight: '500' }}>
              Apply to join India&apos;s first B2B managed Art Infrastructure Platform. Get matched with premium corporate and hospitality projects with guaranteed timely payments.
            </p>
          </div>
        </section>

        {/* Benefits Grid */}
        <section style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>
              Why Artists <span className="gradient-text">Love Sarvalay</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="glass-card" style={{ padding: '32px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(179,18,23,0.08)', border: '1px solid rgba(179,18,23,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-indigo)', marginBottom: '20px' }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '10px' }}>{b.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.65' }}>{b.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Form and Roadmap split */}
        <section style={{ padding: '80px 24px', background: 'rgba(0,0,0,0.01)', borderTop: '1px solid rgba(0,0,0,0.03)', borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '64px', alignItems: 'flex-start' }} className="contact-grid">
            {/* Onboarding Steps */}
            <div>
              <div className="section-label" style={{ marginBottom: '16px' }}>Onboarding Roadmap</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '24px' }}>
                How to <span className="gradient-text">Join Us</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {steps.map((s) => (
                  <div key={s.num} style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ width: '36px', height: '36px', background: 'var(--color-indigo)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.85rem', fontWeight: '700' }}>
                      {s.num}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '4px' }}>{s.title}</h4>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: '1.6' }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Requirements Notice */}
              <div className="glass-card" style={{ marginTop: '40px', padding: '24px', borderLeft: '4px solid var(--color-indigo)' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Important Requirements</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '16px', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                  <li>Must have a digital portfolio or social media showing past mural/artwork.</li>
                  <li>Ready to travel for commercial projects in your region.</li>
                  <li>Comfortable working on scaffoldings or hydraulic lifts for large-format murals (training provided).</li>
                </ul>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="glass-card" style={{ padding: '40px', border: '1px solid var(--color-border)', boxShadow: '0 20px 80px rgba(179,18,23,0.04)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: '64px', height: '64px', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', color: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <CheckCircle size={36} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Application Submitted!</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                    Thank you, {formData.name}. Our curation team will review your portfolio and get back to you within 3–5 working days to schedule your onboarding call.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
                    <span>Submit another application</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Artist Application Form</h3>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      className="input-field"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="contact-grid">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="priya@domain.com"
                        className="input-field"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="input-field"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="contact-grid">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>City *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mumbai"
                        className="input-field"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Years of Experience *</label>
                      <select
                        required
                        className="input-field"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      >
                        <option value="">Select Experience</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="6-9 years">6-9 years</option>
                        <option value="10+ years">10+ years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Primary Art Style / Specialty *</label>
                    <select
                      required
                      className="input-field"
                      value={formData.style}
                      onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                    >
                      <option value="">Select Primary Style</option>
                      <option value="Mandala & Traditional">Mandala &amp; Traditional Indian</option>
                      <option value="Abstract & Geometric">Abstract &amp; Geometric</option>
                      <option value="Graffiti & Street Art">Graffiti &amp; Street Art</option>
                      <option value="Botanical & Landscapes">Botanical &amp; Landscapes</option>
                      <option value="3D Sculpture & Relief Panels">3D Sculpture &amp; Relief Panels</option>
                      <option value="Other">Other Style</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Link to Portfolio or Social Media (Instagram/Behance) *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://behance.net/portfolio"
                      className="input-field"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>Brief Bio &amp; Specialty Details</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your art style, mediums you work with, and any key commercial projects you have done."
                      className="input-field"
                      style={{ resize: 'none' }}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', opacity: submitting ? 0.75 : 1 }}
                  >
                    <span>{submitting ? 'Submitting Application...' : 'Submit Application'}</span>
                    {!submitting && <ArrowRight size={16} />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section style={{ padding: '80px 24px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-label" style={{ justifyContent: 'center', marginBottom: '12px' }}>Got Questions?</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>
              Artist Partnership <span className="gradient-text">FAQs</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { q: 'How does payment work?', a: 'Sarvalay operates on a strict milestone B2B payment model. We collect advances from clients and make structured disbursements (e.g., 30% advance on layout approval, 40% on draft completion, and 30% on mandatory quality sign-off). Payouts are made directly via bank transfer within 48 hours of reaching each milestone.' },
              { q: 'Who owns the designs generated?', a: 'The custom artwork prepared specifically for a client remains intellectual property of the artist, licensed permanently to the client for display in their commercial space. For promotional assets or generic mockups, ownership remains fully with the artist.' },
              { q: 'Do I have to purchase the painting materials?', a: 'No, Sarvalay supplies all high-grade, professional acrylics, varnishes, sealants, brushes, and site safety materials as standardized by our operations team. We ensure the raw materials meet our 8-year comprehensive color and durability guarantee.' },
              { q: 'Can standard artists get premium projects?', a: 'Yes! Artists start in the Standard tier and can upgrade to Premium tier based on project feedback scores, timeline adherence, and curation review after successfully completing 3 projects on our platform.' },
            ].map((faq, i) => (
              <div key={i} className="glass-card" style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <HelpCircle size={16} style={{ color: 'var(--color-indigo)', flexShrink: 0 }} />
                  {faq.q}
                </h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: '1.6', paddingLeft: '24px' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
