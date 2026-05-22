'use client';
import { UserCog, BellRing, Link as LinkIcon, Paintbrush, Bot } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Platform Settings</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Configure global platform behavior, roles, and integrations.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '32px' }}>
        {/* Settings Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SettingsTab icon={UserCog} label="User Roles" active />
          <SettingsTab icon={BellRing} label="Notifications" />
          <SettingsTab icon={LinkIcon} label="Integrations" />
          <SettingsTab icon={Paintbrush} label="Branding" />
          <SettingsTab icon={Bot} label="AI Settings" />
        </div>

        {/* Settings Content */}
        <div className="glass-card" style={{ padding: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px' }}>User Roles & Permissions</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ paddingBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--color-text-primary)' }}>Super Admin</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Full access to all modules including finance and system settings.</div>
                </div>
                <span className="badge badge-indigo">System Default</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ fontSize: '0.8rem', background: 'var(--color-bg-secondary)', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>2 Users Assigned</span>
              </div>
            </div>

            <div style={{ paddingBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '1rem', color: 'var(--color-text-primary)' }}>Operations Manager</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Access to projects, artists, logistics, and mockups. Cannot access finance.</div>
                </div>
                <button style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'transparent', cursor: 'pointer' }}>Edit Access</button>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ fontSize: '0.8rem', background: 'var(--color-bg-secondary)', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>4 Users Assigned</span>
              </div>
            </div>

            <button className="btn-primary" style={{ alignSelf: 'flex-start', padding: '10px 20px', fontSize: '0.9rem' }}>
              + Create Custom Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ icon: Icon, label, active }: any) {
  return (
    <div style={{ 
      display: 'flex', alignItems: 'center', gap: '12px', 
      padding: '12px 16px', borderRadius: '8px', 
      background: active ? 'rgba(179,18,23,0.08)' : 'transparent',
      color: active ? 'var(--color-indigo-dark)' : 'var(--color-text-secondary)',
      fontWeight: active ? '600' : '500', fontSize: '0.9rem',
      cursor: 'pointer', transition: 'all 0.2s ease'
    }}>
      <Icon size={18} />
      {label}
    </div>
  );
}
