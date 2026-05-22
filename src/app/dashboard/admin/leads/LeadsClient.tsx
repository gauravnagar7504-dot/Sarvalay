'use client';

import { useState } from 'react';
import { Filter, Search, Plus, X, Phone, Mail, Building, Landmark, Settings } from 'lucide-react';
import { createLead, updateLeadStatus } from '@/app/actions/operations';
import { LeadStatus } from '@prisma/client';

interface LeadsClientProps {
  initialLeads: any[];
}

export default function LeadsClient({ initialLeads }: LeadsClientProps) {
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // New Lead Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: 'hotel',
    serviceType: 'Wall Murals',
    budget: '₹3L – ₹5L',
    timeline: '1–2 months',
    notes: '',
  });

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await createLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      industry: form.industry,
      serviceType: form.serviceType,
      budget: form.budget,
      timeline: form.timeline,
      notes: form.notes,
    });
    setSubmitting(false);
    if (res.success) {
      alert('Lead added successfully!');
      setShowModal(false);
      // Reset form
      setForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        industry: 'hotel',
        serviceType: 'Wall Murals',
        budget: '₹3L – ₹5L',
        timeline: '1–2 months',
        notes: '',
      });
      // Dynamically add to the visible list immediately for seamless no-code UI feeling
      window.location.reload();
    } else {
      alert('Error creating lead: ' + res.error);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    const res = await updateLeadStatus(leadId, newStatus);
    if (res.success) {
      setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    } else {
      alert('Error updating status: ' + res.error);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchSearch = 
      lead.name.toLowerCase().includes(search.toLowerCase()) || 
      lead.company.toLowerCase().includes(search.toLowerCase()) || 
      lead.email.toLowerCase().includes(search.toLowerCase());
    
    if (filterStatus === 'ALL') return matchSearch;
    return matchSearch && lead.status === filterStatus;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Leads Pipeline</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Manage and convert incoming B2B consultation requests.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="btn-primary" 
          style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer' }}
        >
          <Plus size={18} /> Add Lead manually
        </button>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '260px', maxWidth: '360px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }} 
            />
          </div>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'transparent', outline: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', fontWeight: '500' }}
          >
            <option value="ALL">All Stages</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="CONSULTED">Consulted</option>
            <option value="MOCKUP_GENERATED">Mockups Ready</option>
            <option value="PROPOSAL_SENT">Proposal Sent</option>
            <option value="CLOSED">Closed (Converted)</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Name / Contact</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Company / Space</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Service Interest</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Pipeline Status</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    No leads found matching current filter rules.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>{lead.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'flex', gap: '8px', marginTop: '4px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Mail size={12} /> {lead.email}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>{lead.company}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'capitalize' }}>{lead.industry}</div>
                    </td>
                    <td style={{ padding: '16px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>
                      {lead.serviceType}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span className={`badge ${
                        lead.status === 'CLOSED' ? 'badge-gold' : 
                        lead.status === 'PROPOSAL_SENT' ? 'badge-indigo' : 
                        'badge-indigo'
                      }`} style={{ textTransform: 'capitalize' }}>
                        {lead.status.replace('_', ' ').toLowerCase()}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#fff', fontSize: '0.8rem', cursor: 'pointer', outline: 'none' }}
                      >
                        <option value="SUBMITTED">Submitted</option>
                        <option value="CONSULTED">Consulted</option>
                        <option value="MOCKUP_GENERATED">Mockups Ready</option>
                        <option value="PROPOSAL_SENT">Proposal Sent</option>
                        <option value="CLOSED">Closed (Converted)</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* manual creation Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, padding: '20px'
        }}>
          <div className="glass-card" style={{
            width: '100%', maxWidth: '540px', background: '#fff',
            borderRadius: '16px', padding: '32px', boxShadow: '0 24px 80px rgba(0,0,0,0.15)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', top: '24px', right: '24px', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '6px' }}>Add Lead Manually</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>Fill in consultation data to register high-value clients.</p>

            <form onSubmit={handleCreateLead} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Client Name *</label>
                <input 
                  type="text" required placeholder="Rajesh Mehta" className="input-field"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Email Address *</label>
                  <input 
                    type="email" required placeholder="rajesh@hotel.com" className="input-field"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Phone Number *</label>
                  <input 
                    type="tel" required placeholder="+91 98765 43210" className="input-field"
                    value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Company Name *</label>
                  <input 
                    type="text" required placeholder="Radisson Blu Mumbai" className="input-field"
                    value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Industry</label>
                  <select 
                    className="input-field" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  >
                    <option value="hotel">Hospitality</option>
                    <option value="office">Corporate Office</option>
                    <option value="restaurant">Restaurant / F&B</option>
                    <option value="retail">Retail / Showroom</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Service Type</label>
                  <select 
                    className="input-field" value={form.serviceType} onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                  >
                    <option value="Wall Murals">Wall Murals</option>
                    <option value="Art Installations">Art Installations</option>
                    <option value="Space Transformation">Space Transformation</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Budget Range</label>
                  <select 
                    className="input-field" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  >
                    <option value="Under ₹1L">Under ₹1L</option>
                    <option value="₹1L – ₹3L">₹1L – ₹3L</option>
                    <option value="₹3L – ₹5L">₹3L – ₹5L</option>
                    <option value="₹5L – ₹10L">₹5L – ₹10L</option>
                    <option value="₹10L+">₹10L+</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Additional Curation Requirements</label>
                <textarea 
                  rows={2} placeholder="Preferred Indian heritage art patterns, 40x12ft dimensions..." className="input-field" style={{ resize: 'none' }}
                  value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>

              <button 
                type="submit" disabled={submitting} className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem', cursor: 'pointer', marginTop: '10px' }}
              >
                <span>{submitting ? 'Creating Lead...' : 'Submit Lead into Pipeline'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
