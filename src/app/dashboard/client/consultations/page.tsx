'use client';
import { Calendar, Video, User, Clock, ExternalLink, MessageSquare, Phone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ClientConsultationsPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: '400', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Consultations & Site Visits</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Manage your strategy calls, project alignment briefs, and scheduled on-site inspections.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' }}>
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Upcoming Consultation */}
          <section className="glass-card" style={{ padding: '32px', borderLeft: '4px solid var(--color-indigo)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <span className="badge badge-indigo" style={{ marginBottom: '12px' }}>UPCOMING SESSION</span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>Site Alignment & Mockup Walkthrough</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>Discussing Option A (Heritage Fusion) mural refinements for the grand lobby.</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'block' }}>Ref ID</span>
                <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>CS-9021</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', background: 'var(--color-bg-secondary)', padding: '20px', borderRadius: '8px', border: '1px solid var(--color-border)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Calendar size={20} style={{ color: 'var(--color-indigo)' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Date</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>Thu, May 28, 2026</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Clock size={20} style={{ color: 'var(--color-indigo)' }} />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Time (IST)</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>11:00 AM – 11:30 AM</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-bg-secondary)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                  <img src="/images/artist_portrait_2.png" alt="Director" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Art Director</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>Gagan Singh Hada</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>Reschedule</button>
                <Link href="https://meet.google.com" target="_blank" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                  <Video size={16} /> Join Call <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </section>

          {/* Past Consultations */}
          <section className="glass-card" style={{ padding: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '20px' }}>Consultation History</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { title: 'Initial Space & Concept Review', id: 'CS-8911', date: 'Oct 04, 2026', host: 'Sakshi G.', outcome: 'Mockup Brief finalized' },
                { title: 'Technical Feasibility Walkthrough', id: 'CS-8902', date: 'Oct 11, 2026', host: 'Gagan H.', outcome: 'Site wall prep confirmed' }
              ].map((row) => (
                <div key={row.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '4px' }}>{row.title}</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      {row.id} • Hosted by {row.host} • <span style={{ color: 'var(--color-indigo)' }}>{row.date}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#10B981', fontWeight: '500' }}>
                    <ShieldCheck size={16} /> {row.outcome}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '600', marginBottom: '16px' }}>Direct Support</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>Need immediate changes or custom schedules? Speak to our Project Concierge team directly.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="tel:+918440056993" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', padding: '12px', background: 'var(--color-bg-secondary)', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}>
                <Phone size={16} style={{ color: 'var(--color-indigo)' }} /> Call +91 84400-56993
              </a>
              <a href="https://wa.me/918440056993" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', padding: '12px', background: 'rgba(37,211,102,0.06)', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#25D366', border: '1px solid rgba(37,211,102,0.2)' }}>
                <MessageSquare size={16} /> WhatsApp Support
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
