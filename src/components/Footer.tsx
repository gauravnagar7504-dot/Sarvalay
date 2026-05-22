'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const InstaSVG = () => <svg width={15} height={15} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>;
const LinkedinSVG = () => <svg width={15} height={15} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const XSVG = () => <svg width={15} height={15} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;

const footerLinks = {
  Solutions: [
    { label: 'Wall Murals', href: '/solutions/wall-murals' },
    { label: 'Art Installations', href: '/solutions/art-installations' },
    { label: 'Space Transformation', href: '/solutions/space-transformation' },
    { label: 'Maintenance & Restoration', href: '/solutions/maintenance' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Process', href: '/our-process' },
    { label: 'Projects', href: '/projects' },
    { label: 'Artists', href: '/artists' },
  ],
  Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Case Studies', href: '/projects' },
    { label: 'Artist Application', href: '/apply' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Refund Policy', href: '/refund' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: 'rgba(255, 255, 255, 0.98)', borderTop: '1px solid var(--color-border)', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* CTA Banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(179,18,23,0.05), rgba(179,18,23,0.05))', border: '1px solid var(--color-border)', borderRadius: '20px', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap', marginBottom: '64px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Ready to Transform Your Space?</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>Book a free consultation and get AI-powered mockups within 48 hours.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/consult" className="btn-gold">Book Free Consultation <ArrowUpRight size={16} /></Link>
            <Link href="/contact" className="btn-secondary"><span>Talk to Us</span></Link>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Image 
                src="/images/sarvalay-logo.png" 
                alt="Sarvalay Logo" 
                width={140} 
                height={40} 
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '20px', maxWidth: '280px' }}>
              India&apos;s first managed B2B Art Infrastructure Platform. We transform commercial spaces through curated art and flawless execution.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {[
                { icon: Mail, text: 'hello@sarvalay.com', href: 'mailto:hello@sarvalay.com' },
                { icon: Phone, text: '+91 84400-56993', href: 'tel:+918440056993' },
                { icon: MapPin, text: 'Pan India Operations', href: '/contact' },
              ].map(({ icon: Icon, text, href }) => (
                <a key={text} href={href} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-secondary)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)'}>
                  <Icon size={14} style={{ color: 'var(--color-indigo)', flexShrink: 0 }} />
                  {text}
                </a>
              ))}
            </div>
            <div style={{ display: 'none', gap: '10px' }}>
              {/* Temporarily hiding social icons until URLs are provided */}
              {[
                { Icon: InstaSVG, href: '#', label: 'Instagram' },
                { Icon: LinkedinSVG, href: '#', label: 'LinkedIn' },
                { Icon: XSVG, href: '#', label: 'X (Twitter)' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} style={{ width: '36px', height: '36px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', transition: 'all 0.2s ease', textDecoration: 'none' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(179,18,23,0.05)'; el.style.borderColor = 'var(--color-indigo)'; el.style.color = 'var(--color-indigo-dark)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(0,0,0,0.02)'; el.style.borderColor = 'rgba(0,0,0,0.05)'; el.style.color = 'var(--color-text-secondary)'; }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '16px' }}>{category}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((link) => (
                  <Link key={link.href} href={link.href} style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)'}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingBottom: '32px', borderBottom: '1px solid var(--color-border)', marginBottom: '24px' }}>
          {[
            { text: '8-Year Comprehensive Guarantee', color: 'gold' },
            { text: 'Pan India Execution', color: 'indigo' },
            { text: '50+ Verified Artists', color: 'indigo' },
            { text: 'AI-Powered Mockups', color: 'gold' },
            { text: 'Timely Delivery', color: 'green' },
          ].map(({ text, color }) => (
            <span key={text} className={`badge badge-${color}`}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color === 'gold' ? 'var(--color-indigo)' : color === 'green' ? '#4ade80' : 'var(--color-indigo-light)' }} />
              {text}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '32px', gap: '16px', flexWrap: 'wrap' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>© 2026 Sarvalay. All rights reserved. Built by Gagan Singh Hada &amp; Sakshi Gupta.</p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>India&apos;s Art Infrastructure — <span style={{ color: 'var(--color-indigo-light)' }}>Building the Future of Commercial Art</span></p>
        </div>
      </div>
    </footer>
  );
}
