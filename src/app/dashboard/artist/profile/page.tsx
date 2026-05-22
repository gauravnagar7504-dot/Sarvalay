'use client';
import { User, Shield, Briefcase, MapPin, Check, Edit3, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function ArtistProfilePage() {
  const [available, setAvailable] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Rohan Sharma',
    city: 'Mumbai, Maharashtra',
    specialty: 'Wall Murals & Heritage Indian',
    experience: '8+ Years',
    tier: 'Tier 1 (Elite Partner)',
    email: 'rohan.sharma@gmail.com',
    phone: '+91 98222 33444',
  });

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>Creator Settings</h1>
          <p style={{ color: '#6B7280' }}>Manage your portfolio details, specialty tags, bank payouts info, and availability.</p>
        </div>
        <button onClick={() => setEditing(!editing)} style={{ background: '#111827', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {editing ? <><Check size={16} /> Save Settings</> : <><Edit3 size={16} /> Edit Profile</>}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Personal Details */}
        <section style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '32px' }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '28px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F3F4F6', overflow: 'hidden', border: '1px solid #E5E7EB', position: 'relative' }}>
              <img src="/images/artist_portrait_1.png" alt="Rohan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '700', color: '#111827' }}>{profile.name}</h2>
              <span style={{ background: '#FEF3C7', color: '#D97706', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', display: 'inline-block', marginTop: '4px' }}>{profile.tier}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', color: '#9CA3AF', marginBottom: '6px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>CREATOR SPECIALTY</label>
              {editing ? (
                <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E5E7EB' }} value={profile.specialty} onChange={e => setProfile({...profile, specialty: e.target.value})} />
              ) : (
                <div style={{ fontWeight: '600', color: '#111827', fontSize: '0.95rem' }}>{profile.specialty}</div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', color: '#9CA3AF', marginBottom: '6px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>BASE LOCATION</label>
              {editing ? (
                <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E5E7EB' }} value={profile.city} onChange={e => setProfile({...profile, city: e.target.value})} />
              ) : (
                <div style={{ fontWeight: '600', color: '#111827', fontSize: '0.95rem' }}><MapPin size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-top' }} /> {profile.city}</div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', color: '#9CA3AF', marginBottom: '6px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>EMAIL</label>
              <div style={{ color: '#4B5563', fontSize: '0.95rem' }}>{profile.email}</div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7--------------', color: '#9CA3AF', marginBottom: '6px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>PHONE</label>
              <div style={{ color: '#4B5563', fontSize: '0.95rem' }}>{profile.phone}</div>
            </div>
          </div>
        </section>

        {/* Availability Toggle */}
        <section style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>Availability Status</h3>
            <p style={{ fontSize: '0.82rem', color: '#6B7280' }}>Marking yourself as busy prevents new project match proposals in your inbox.</p>
          </div>
          <button 
            onClick={() => setAvailable(!available)} 
            style={{ 
              background: available ? '#10B981' : '#EF4444', 
              color: 'white', 
              border: 'none', 
              padding: '10px 24px', 
              borderRadius: '8px', 
              fontWeight: '600', 
              fontSize: '0.9rem', 
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}>
            {available ? 'Available Now' : 'Busy (On Site)'}
          </button>
        </section>

        {/* Verification Status */}
        <section style={{ background: 'rgba(79,70,229,0.02)', border: '1px solid rgba(79,70,229,0.1)', borderRadius: '16px', padding: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Shield size={24} style={{ color: '#4F46E5', flexShrink: 0 }} />
          <div style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: '1.4' }}>
            Your Tier 1 certification was verified by the Operations Council on Oct 10, 2026. For tax audits, bank payouts details, or custom specialties queries, contact <a href="mailto:creator@sarvalay.com" style={{ color: '#4F46E5', fontWeight: '600', textDecoration: 'none' }}>creator@sarvalay.com</a>.
          </div>
        </section>

      </div>
    </div>
  );
}
