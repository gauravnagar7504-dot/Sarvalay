'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        <section style={{ padding: '80px 24px 48px', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>Get in Touch</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            Let&apos;s Transform <span className="gradient-text">Your Space</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            Ready to start? Have a question? Our team responds to all enquiries within 4 business hours.
          </p>
        </section>

        <div style={{
          maxWidth: '1100px', margin: '0 auto', padding: '0 24px 100px',
          display: 'grid',
          gridTemplateColumns: 'clamp(280px, 35%, 420px) 1fr',
          gap: '32px'
        }}
          className="contact-grid"
        >
          {/* Contact Info */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {[
                { icon: Phone, label: 'Phone', value: '+91 84400-56993', href: 'tel:+918440056993' },
                { icon: Mail, label: 'Email', value: 'hello@sarvalay.com', href: 'mailto:hello@sarvalay.com' },
                { icon: MapPin, label: 'Office', value: 'Mumbai, India — Pan India Operations', href: '/contact' },
                { icon: Clock, label: 'Response Time', value: 'Within 4 business hours', href: '#' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', textDecoration: 'none', padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--color-border)', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(179,18,23,0.3)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; }}>
                  <div style={{ width: '38px', height: '38px', background: 'rgba(179,18,23,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} style={{ color: 'var(--color-indigo-light)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{label}</div>
                    <div style={{ color: 'var(--color-text-primary)', fontSize: '0.88rem', fontWeight: '500' }}>{value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '14px' }}>
                <MessageSquare size={20} style={{ color: 'var(--color-indigo)', flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '6px' }}>Prefer WhatsApp?</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>Send us a message directly on WhatsApp for a faster response.</p>
                </div>
              </div>
              <a href="https://wa.me/918440056993?text=Hi%20Sarvalay%2C%20I'm%20Interested%20in%20your%20art%20services"
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: '#25D366', borderRadius: '8px', color: 'white', fontWeight: '600', fontSize: '0.9rem', textDecoration: 'none', transition: 'opacity 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.9'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}>
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card" style={{ padding: '32px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Message Sent!</h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>Our team will respond within 4 business hours. You can also <a href="https://wa.me/918440056993" style={{ color: 'var(--color-indigo-light)' }}>WhatsApp us</a> for a faster reply.</p>
                <Link href="/consult" className="btn-primary"><span>Book a Consultation →</span></Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '24px' }}>Send Us a Message</h2>
                {/* Name + Email — responsive grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Full Name *</label>
                    <input required className="input-field" id="contact-name" type="text" placeholder="Rajesh Mehta" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Email *</label>
                    <input required className="input-field" id="contact-email" type="email" placeholder="rajesh@hotel.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                {/* Phone + Company — responsive grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Phone</label>
                    <input className="input-field" id="contact-phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Company</label>
                    <input className="input-field" id="contact-company" type="text" placeholder="Hotel Group / Corp" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Service Interest</label>
                  <select className="input-field" id="contact-service" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{ cursor: 'pointer' }}>
                    <option value="">Select a service...</option>
                    <option value="murals">Wall Murals</option>
                    <option value="installations">Art Installations</option>
                    <option value="transformation">Space Transformation</option>
                    <option value="maintenance">Maintenance &amp; Restoration</option>
                    <option value="general">General Enquiry</option>
                  </select>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Message *</label>
                  <textarea required className="input-field" id="contact-message" rows={4} placeholder="Tell us about your space, budget range, and project timeline..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '14px' }}>
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
