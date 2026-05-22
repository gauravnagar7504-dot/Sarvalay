'use client';
import { MessageSquare, Phone, Mail, HelpCircle, ChevronDown, CheckCircle2, Clock } from 'lucide-react';
import { useState } from 'react';

export default function ClientSupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'How long does a typical 40ft mural take to complete?', a: 'Typically, execution takes between 14 to 21 working days on-site, following wall preparation and surface priming.' },
    { q: 'What is covered under the 8-Year comprehensive guarantee?', a: 'Our guarantee covers paint peeling, fading under normal conditions, moisture leaks, and restoration check-ins. If micro-cracks develop, our restoration crew fixes it within 48 hours.' },
    { q: 'Can we request mockups for multiple options?', a: 'Yes! Our IVDE mockup engine generates 10 basic styles, and our designated design directors curate up to 3 photorealistic mockups matching your architecture.' },
    { q: 'What are the payment milestone structures?', a: 'Payments are scheduled as 50% booking advance, 30% mid-execution (post surface preparation), and 20% post-delivery handover.' },
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: '400', color: 'var(--color-text-primary)', marginBottom: '12px' }}>White-Glove Support</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Have questions about execution details or timelines? Reach your dedicated team instantly.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>
        {/* Main Columns */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Active Tickets */}
          <section className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px' }}>Active Service Tickets</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'var(--color-bg-secondary)', borderRadius: '8px', border: '1px solid var(--color-border)', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>TICKET ID: TK-3902</span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--color-text-primary)', marginTop: '2px' }}>Confirming Scaffolding Clearances</h3>
                  </div>
                  <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}><Clock size={12} /> IN REVIEW</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '16px', lineHeight: '1.5' }}>
                  Operations is confirming height clearances for the grand lobby scaffolding with the hotel security desk.
                </p>
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '12px', fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Updated: Today, 10:15 AM</span>
                  <span style={{ color: 'var(--color-indigo)', fontWeight: '600' }}>Owner: Sakshi G. (Ops Manager)</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--color-border)', borderRadius: '8px', padding: '16px', cursor: 'pointer', color: 'var(--color-indigo)', fontWeight: '600', fontSize: '0.9rem' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(179,18,23,0.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                + Log A New Service Request
              </div>
            </div>
          </section>

          {/* Premium FAQs Accordions */}
          <section className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px' }}>Frequently Asked Questions</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqs.map((faq, idx) => (
                <div key={idx} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '12px' }}>
                  <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} style={{ width: '100%', border: 'none', background: 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '12px 0', textAlign: 'left' }}>
                    <span style={{ fontWeight: '600', color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>{faq.q}</span>
                    <ChevronDown size={16} style={{ color: 'var(--color-text-secondary)', transform: openFaq === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>
                  {openFaq === idx && (
                    <div style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', padding: '4px 0 12px', lineHeight: '1.6' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar Helpdesk */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <section className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '600', marginBottom: '16px' }}>White-Glove Helpline</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>VIP B2B accounts are assigned a dedicated operations partner for seamless, 1-click updates.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="tel:+918440056993" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', padding: '12px', background: 'var(--color-bg-secondary)', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}>
                <Phone size={16} style={{ color: 'var(--color-indigo)' }} /> Call +91 84400-56993
              </a>
              <a href="https://wa.me/918440056993" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', padding: '12px', background: 'rgba(37,211,102,0.06)', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#25D366', border: '1px solid rgba(37,211,102,0.2)' }}>
                <MessageSquare size={16} /> WhatsApp Support
              </a>
              <a href="mailto:ops@sarvalay.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', padding: '12px', background: 'var(--color-bg-secondary)', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}>
                <Mail size={16} style={{ color: 'var(--color-indigo)' }} /> ops@sarvalay.com
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
