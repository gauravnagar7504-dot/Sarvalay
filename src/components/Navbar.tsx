'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'Wall Murals', href: '/solutions/wall-murals' },
      { label: 'Art Installations', href: '/solutions/art-installations' },
      { label: 'Space Transformation', href: '/solutions/space-transformation' },
      { label: 'Maintenance & Restoration', href: '/solutions/maintenance' },
    ],
  },
  { label: 'Our Process', href: '/our-process' },
  { label: 'Projects', href: '/projects' },
  { label: 'Artists', href: '/artists' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.4s ease',
          background: isScrolled
            ? 'rgba(255, 255, 255, 0.95)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled
            ? '1px solid var(--color-border)'
            : '1px solid transparent',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Image 
                src="/images/sarvalay-logo.png" 
                alt="Sarvalay Logo" 
                width={160} 
                height={48} 
                style={{ objectFit: 'contain' }}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              className="hidden-mobile">
              {navLinks.map((link) => (
                <div key={link.label} style={{ position: 'relative' }}
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}>
                  {link.children ? (
                    <button
                      style={{
                        display: 'flex', alignItems: 'center', gap: '4px',
                        padding: '8px 14px', borderRadius: '6px',
                        background: 'transparent', border: 'none',
                        color: 'var(--color-text-secondary)',
                        fontSize: '0.88rem', fontWeight: '500',
                        cursor: 'pointer', transition: 'all 0.2s ease',
                        fontFamily: 'var(--font-body)',
                      }}
                      className="nav-hover"
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(108,99,255,0.08)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)';
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                    >
                      {link.label}
                      <ChevronDown size={14} style={{
                        transition: 'transform 0.2s',
                        transform: activeDropdown === link.label ? 'rotate(180deg)' : 'rotate(0)',
                      }} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      style={{
                        display: 'block', padding: '8px 14px', borderRadius: '6px',
                        color: 'var(--color-text-secondary)',
                        fontSize: '0.88rem', fontWeight: '500',
                        textDecoration: 'none', transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.color = 'var(--color-text-primary)';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(108,99,255,0.08)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)';
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                      }}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {link.children && activeDropdown === link.label && (
                    <div style={{
                      position: 'absolute', top: '100%', left: '-12px',
                      background: 'rgba(255, 255, 255, 0.98)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '12px',
                      padding: '8px',
                      minWidth: '220px',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
                      animation: 'fadeInDown 0.2s ease',
                    }}>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          style={{
                            display: 'block', padding: '10px 14px', borderRadius: '8px',
                            color: 'var(--color-text-secondary)',
                            fontSize: '0.875rem', fontWeight: '500',
                            textDecoration: 'none', transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.color = 'var(--color-indigo-light)';
                            (e.currentTarget as HTMLElement).style.background = 'rgba(108,99,255,0.1)';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)';
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              className="hidden-mobile">
              <Link href="/contact" className="btn-secondary" style={{ padding: '9px 20px', fontSize: '0.875rem' }}>
                <span>Contact</span>
              </Link>
              <Link href="/consult" className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.875rem' }}>
                <span>Book Consultation</span>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none', background: 'transparent', border: 'none',
                color: 'var(--color-text-primary)', cursor: 'pointer', padding: '8px',
              }}
              id="mobile-menu-btn"
              className="show-mobile"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 90,
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          paddingTop: '80px',
          overflowY: 'auto',
        }}>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href || '#'}
                  style={{
                    display: 'block', padding: '14px 16px', borderRadius: '10px',
                    color: 'var(--color-text-primary)',
                    fontSize: '1.1rem', fontWeight: '600',
                    textDecoration: 'none',
                    background: 'rgba(0,0,0,0.02)',
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                    fontFamily: 'var(--font-heading)',
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div style={{ paddingLeft: '16px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        style={{
                          display: 'block', padding: '10px 14px', borderRadius: '8px',
                          color: 'var(--color-text-secondary)',
                          fontSize: '0.95rem', fontWeight: '500',
                          textDecoration: 'none',
                        }}
                        onClick={() => setMobileOpen(false)}
                      >
                        → {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/contact" className="btn-secondary" style={{ justifyContent: 'center' }}
                onClick={() => setMobileOpen(false)}>
                <span>Contact Us</span>
              </Link>
              <Link href="/consult" className="btn-primary" style={{ justifyContent: 'center' }}
                onClick={() => setMobileOpen(false)}>
                <span>Book Free Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1024px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
