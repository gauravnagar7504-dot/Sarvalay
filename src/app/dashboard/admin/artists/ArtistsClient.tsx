'use client';

import { useState, useTransition } from 'react';
import { Search, Filter, Star, UserPlus, CheckCircle2, AlertCircle, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { updateArtistAvailability, updateArtistTier } from '@/app/actions/operations';
import { ArtistTier } from '@prisma/client';

interface ArtistsClientProps {
  initialArtists: any[];
}

export default function ArtistsClient({ initialArtists }: ArtistsClientProps) {
  const [artists, setArtists] = useState(initialArtists);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedTier, setSelectedTier] = useState('All Tiers');
  const [isPending, startTransition] = useTransition();

  // Search & Filter Logic
  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (artist.email && artist.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const profile = artist.artistProfile;
    const specialties = profile?.specialties || [];
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || 
      specialties.some((s: string) => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));
    
    const tier = profile?.tier || 'TIER_3';
    const matchesTier = selectedTier === 'All Tiers' || 
      (selectedTier === 'Tier 1' && tier === 'TIER_1_ELITE') ||
      (selectedTier === 'Tier 2' && tier === 'TIER_2_PRO') ||
      (selectedTier === 'Tier 3' && tier === 'TIER_3');

    return matchesSearch && matchesSpecialty && matchesTier;
  });

  // Unique specialties for filter dropdown
  const allSpecialties = Array.from(
    new Set(
      artists.flatMap(a => a.artistProfile?.specialties || [])
    )
  );

  const handleToggleAvailability = async (profileId: string, currentStatus: boolean) => {
    startTransition(async () => {
      const res = await updateArtistAvailability(profileId, !currentStatus);
      if (res.success) {
        setArtists(prev => prev.map(a => {
          if (a.artistProfile?.id === profileId) {
            return {
              ...a,
              artistProfile: {
                ...a.artistProfile,
                isAvailable: !currentStatus
              }
            };
          }
          return a;
        }));
      } else {
        alert('Failed to update availability: ' + res.error);
      }
    });
  };

  const handleTierChange = async (profileId: string, newTier: ArtistTier) => {
    startTransition(async () => {
      const res = await updateArtistTier(profileId, newTier);
      if (res.success) {
        setArtists(prev => prev.map(a => {
          if (a.artistProfile?.id === profileId) {
            return {
              ...a,
              artistProfile: {
                ...a.artistProfile,
                tier: newTier
              }
            };
          }
          return a;
        }));
      } else {
        alert('Failed to update tier: ' + res.error);
      }
    });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Artist Network</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Manage supply side: execution artists, tiers, and availability.</p>
        </div>
        <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <UserPlus size={18} /> Invite Artist
        </button>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px', maxWidth: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search artists..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', background: '#FFF' }} 
            />
          </div>
          
          <select 
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', background: '#FFF' }}
          >
            <option>All Specialties</option>
            {allSpecialties.map((s, idx) => (
              <option key={idx} value={s}>{s}</option>
            ))}
          </select>

          <select 
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', background: '#FFF' }}
          >
            <option>All Tiers</option>
            <option>Tier 1</option>
            <option>Tier 2</option>
            <option>Tier 3</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Artist</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Specialties</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Tier</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Email</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Availability</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArtists.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    No matching artists found in the network.
                  </td>
                </tr>
              ) : (
                filteredArtists.map((artist) => {
                  const profile = artist.artistProfile;
                  const isAvailable = profile?.isAvailable ?? true;
                  const specialties = profile?.specialties || [];
                  const tier = profile?.tier || 'TIER_3';

                  return (
                    <tr key={artist.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(179,18,23,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: 'var(--color-indigo)' }}>
                            {artist.name.charAt(0)}
                          </div>
                          <div>
                            <span style={{ fontWeight: '600', color: 'var(--color-text-primary)', display: 'block' }}>{artist.name}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ID: {artist.id.slice(0, 8)}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {specialties.length === 0 ? (
                            <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>None specified</span>
                          ) : (
                            specialties.map((s: string, idx: number) => (
                              <span key={idx} className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>{s}</span>
                            ))
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <select
                          value={tier}
                          onChange={(e) => {
                            if (profile) {
                              handleTierChange(profile.id, e.target.value as ArtistTier);
                            }
                          }}
                          disabled={!profile}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            border: '1px solid var(--color-border)',
                            background: tier === 'TIER_1_ELITE' ? 'rgba(217,119,6,0.1)' : tier === 'TIER_2_PRO' ? 'rgba(59,130,246,0.1)' : 'rgba(107,114,128,0.1)',
                            color: tier === 'TIER_1_ELITE' ? '#D97706' : tier === 'TIER_2_PRO' ? '#2563EB' : '#4B5563',
                            outline: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="TIER_1_ELITE">Tier 1 (Elite)</option>
                          <option value="TIER_2_PRO">Tier 2 (Pro)</option>
                          <option value="TIER_3">Tier 3 (Standard)</option>
                        </select>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--color-text-secondary)' }}>{artist.email}</td>
                      <td style={{ padding: '16px' }}>
                        {profile ? (
                          <button
                            onClick={() => handleToggleAvailability(profile.id, isAvailable)}
                            style={{
                              border: 'none',
                              background: 'transparent',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              color: isAvailable ? '#10B981' : '#EF4444',
                              fontSize: '0.85rem',
                              fontWeight: '500'
                            }}
                          >
                            {isAvailable ? (
                              <>
                                <CheckCircle2 size={16} /> Available Now
                              </>
                            ) : (
                              <>
                                <AlertCircle size={16} /> Busy / On Site
                              </>
                            )}
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No Profile</span>
                        )}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', gap: '12px', color: 'var(--color-text-muted)' }}>
                          <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                            <Edit size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
