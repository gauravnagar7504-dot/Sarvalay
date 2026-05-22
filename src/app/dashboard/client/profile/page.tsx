'use client';
import { User, Building2, MapPin, Shield, Edit, Mail, Phone, Check } from 'lucide-react';
import { useState } from 'react';

export default function ClientProfilePage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    company: 'Taj Hotels Group',
    gstin: '27AAAAA1111A1Z1',
    address: 'Sardar Vallabhbhai Patel Rd, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001',
    contact: 'Sarah Mathews',
    email: 'sarah.mathews@tajhotels.com',
    phone: '+91 98333 44555',
    industry: 'Hospitality & Luxury Hotels',
  });

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: '400', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Corporate Profile</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Manage your organization particulars, GST records, and account contacts.</p>
        </div>
        <button onClick={() => setEditing(!editing)} className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
          {editing ? <><Check size={16} /> Save Changes</> : <><Edit size={16} /> Edit Profile</>}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Company Card */}
        <section className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '28px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(179,18,23,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-indigo)' }}>
              <Building2 size={32} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>{profile.company}</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{profile.industry}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '8px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>REGISTERED GSTIN</label>
              {editing ? (
                <input type="text" className="input-field" value={profile.gstin} onChange={e => setProfile({...profile, gstin: e.target.value})} />
              ) : (
                <div style={{ fontWeight: '500', color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>{profile.gstin}</div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '8px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>INDUSTRY CLASSIFICATION</label>
              <div style={{ fontWeight: '500', color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>{profile.industry}</div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '8px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>BILLING ADDRESS</label>
              {editing ? (
                <textarea className="input-field" rows={2} value={profile.address} onChange={e => setProfile({...profile, address: e.target.value})} />
              ) : (
                <div style={{ fontWeight: '500', color: 'var(--color-text-primary)', fontSize: '0.95rem', lineHeight: '1.5' }}>{profile.address}</div>
              )}
            </div>
          </div>
        </section>

        {/* Coordinator Info */}
        <section className="glass-card" style={{ padding: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={20} style={{ color: 'var(--color-indigo)' }} /> Account Coordinator
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '8px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>COORDINATOR NAME</label>
              {editing ? (
                <input type="text" className="input-field" value={profile.contact} onChange={e => setProfile({...profile, contact: e.target.value})} />
              ) : (
                <div style={{ fontWeight: '500', color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>{profile.contact}</div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '8px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>PHONE NUMBER</label>
              {editing ? (
                <input type="text" className="input-field" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} />
              ) : (
                <div style={{ fontWeight: '500', color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>{profile.phone}</div>
              )}
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '8px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>EMAIL ADDRESS</label>
              {editing ? (
                <input type="email" className="input-field" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
              ) : (
                <div style={{ fontWeight: '500', color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>{profile.email}</div>
              )}
            </div>
          </div>
        </section>

        {/* Compliance details */}
        <section className="glass-card" style={{ padding: '24px', background: 'rgba(179,18,23,0.02)', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Shield size={24} style={{ color: 'var(--color-indigo)', flexShrink: 0 }} />
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
            Your account compliance is managed under Sarvalay B2B Luxury Standards. To edit verification parameters or transfer account ownership, please reach out to <a href="mailto:ops@sarvalay.com" style={{ color: 'var(--color-indigo)', fontWeight: '600', textDecoration: 'none' }}>ops@sarvalay.com</a>.
          </div>
        </section>

      </div>
    </div>
  );
}
