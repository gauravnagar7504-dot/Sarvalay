'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Briefcase, Image as ImageIcon, 
  Calendar, FileText, LifeBuoy, User, LogOut
} from 'lucide-react';
import Image from 'next/image';

const clientNav = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/client' },
  { label: 'Projects', icon: Briefcase, path: '/dashboard/client/projects' },
  { label: 'Mockups', icon: ImageIcon, path: '/dashboard/client/mockups' },
  { label: 'Consultations', icon: Calendar, path: '/dashboard/client/consultations' },
  { label: 'Invoices', icon: FileText, path: '/dashboard/client/invoices' },
  { label: 'Support', icon: LifeBuoy, path: '/dashboard/client/support' },
  { label: 'Profile', icon: User, path: '/dashboard/client/profile' },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FDFBF8' }}>
      {/* Sidebar - Premium, Luxury Enterprise Portal */}
      <aside style={{ width: '280px', background: 'transparent', borderRight: '1px solid rgba(179,18,23,0.1)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '40px 32px' }}>
          <Link href="/" style={{ display: 'block' }}>
            <Image src="/images/sarvalay-logo.png" alt="Sarvalay" width={130} height={40} style={{ height: 'auto' }} />
          </Link>
        </div>

        <nav style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, marginTop: '20px' }}>
          {clientNav.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
            return (
              <Link key={item.label} href={item.path} style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '14px 20px', borderRadius: '8px',
                background: isActive ? '#FFFFFF' : 'transparent',
                color: isActive ? 'var(--color-indigo-dark)' : '#4a4a4a',
                textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.03)' : 'none',
                border: isActive ? '1px solid rgba(179,18,23,0.1)' : '1px solid transparent'
              }}>
                <item.icon size={18} style={{ color: isActive ? 'var(--color-indigo)' : '#8c8c8c' }} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: '32px 24px' }}>
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            padding: '14px 20px', color: '#8c8c8c',
            textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem'
          }}>
            <LogOut size={18} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '48px', overflowY: 'auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
