'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, UserSquare2, Briefcase, 
  Image as ImageIcon, HardHat, FileText, PieChart, 
  Settings, LogOut, Banknote, PenTool
} from 'lucide-react';
import Image from 'next/image';

const adminNav = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/admin' },
  { label: 'Leads', icon: UserSquare2, path: '/dashboard/admin/leads' },
  { label: 'Clients', icon: Users, path: '/dashboard/admin/clients' },
  { label: 'Projects', icon: Briefcase, path: '/dashboard/admin/projects' },
  { label: 'Mockup Engine', icon: ImageIcon, path: '/dashboard/admin/mockups' },
  { label: 'Artists', icon: PenTool, path: '/dashboard/admin/artists' },
  { label: 'Operations', icon: HardHat, path: '/dashboard/admin/operations' },
  { label: 'Finance', icon: Banknote, path: '/dashboard/admin/finance' },
  { label: 'Content', icon: FileText, path: '/dashboard/admin/content' },
  { label: 'Analytics', icon: PieChart, path: '/dashboard/admin/analytics' },
  { label: 'Settings', icon: Settings, path: '/dashboard/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: 'var(--color-bg-card)', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
          <Link href="/" style={{ display: 'block', marginBottom: '20px' }}>
            <Image src="/images/sarvalay-logo.png" alt="Sarvalay" width={120} height={36} style={{ height: 'auto' }} />
          </Link>
          <div className="badge badge-indigo" style={{ width: 'fit-content', fontSize: '0.75rem', letterSpacing: '0.5px' }}>OPERATIONS OS</div>
        </div>

        <nav style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, overflowY: 'auto' }}>
          {adminNav.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
            return (
              <Link key={item.label} href={item.path} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 14px', borderRadius: '6px',
                background: isActive ? 'rgba(179,18,23,0.08)' : 'transparent',
                color: isActive ? 'var(--color-indigo-dark)' : 'var(--color-text-secondary)',
                textDecoration: 'none', fontWeight: isActive ? '600' : '500', fontSize: '0.875rem',
                transition: 'all 0.2s ease', borderLeft: isActive ? '3px solid var(--color-indigo)' : '3px solid transparent'
              }}>
                <item.icon size={16} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: '20px 16px', borderTop: '1px solid var(--color-border)' }}>
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 14px', borderRadius: '6px', color: 'var(--color-text-muted)',
            textDecoration: 'none', fontWeight: '500', fontSize: '0.875rem'
          }}>
            <LogOut size={16} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        {/* Top Header */}
        <header style={{ height: '72px', background: 'var(--color-bg-card)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
          <div style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
            Sarvalay Admin Control
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-indigo)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              SA
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
