'use client';

import { useState } from 'react';
import { Search, Filter, MoreHorizontal, Building2, Mail } from 'lucide-react';

interface ClientsClientProps {
  initialClients: any[];
}

export default function ClientsClient({ initialClients }: ClientsClientProps) {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState('');

  // Search logic
  const filteredClients = clients.filter(client => {
    const searchStr = `${client.name} ${client.email}`.toLowerCase();
    return searchStr.includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Client Management</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Manage all enterprise accounts and their respective projects.</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '340px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search clients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none', background: '#FFF' }} 
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Client</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Contact Info</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Total Projects</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Revenue Settled</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    No registered clients found.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => {
                  const projects = client.clientProjects || [];
                  const totalProjects = projects.length;
                  
                  // Calculate settled revenue across all projects
                  const revenueSettled = projects.reduce((total: number, project: any) => {
                    const invoices = project.invoices || [];
                    const projectPaid = invoices
                      .filter((inv: any) => inv.isPaid)
                      .reduce((sum: number, inv: any) => sum + inv.amount, 0);
                    return total + projectPaid;
                  }, 0);

                  const formattedRev = `₹${revenueSettled.toLocaleString('en-IN')}`;

                  return (
                    <tr key={client.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(179,18,23,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-indigo)', flexShrink: 0 }}>
                            <Building2 size={18} />
                          </div>
                          <div>
                            <span style={{ fontWeight: '600', color: 'var(--color-text-primary)', display: 'block' }}>{client.name}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ID: {client.id.slice(0, 8)}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                          <Mail size={12} style={{ color: 'var(--color-indigo)' }} /> {client.email}
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>
                        {totalProjects}
                      </td>
                      <td style={{ padding: '16px', color: 'var(--color-text-primary)', fontWeight: '600' }}>
                        {formattedRev}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span className={`badge ${totalProjects > 0 ? 'badge-indigo' : 'badge-gold'}`}>
                          {totalProjects > 0 ? 'Active Account' : 'Prospect Account'}
                        </span>
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
