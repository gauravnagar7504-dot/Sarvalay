'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Brush, Image as ImageIcon, 
  GraduationCap, IndianRupee, Bell, User, LogOut
} from 'lucide-react';
import Image from 'next/image';

const artistNav = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/artist' },
  { label: 'Projects', icon: Brush, path: '/dashboard/artist/projects' },
  { label: 'Portfolio', icon: ImageIcon, path: '/dashboard/artist/portfolio' },
  { label: 'Training', icon: GraduationCap, path: '/dashboard/artist/training' },
  { label: 'Earnings', icon: IndianRupee, path: '/dashboard/artist/earnings' },
  { label: 'Notifications', icon: Bell, path: '/dashboard/artist/notifications' },
  { label: 'Profile', icon: User, path: '/dashboard/artist/profile' },
];

export default function ArtistLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FAFAFA' }}>
      {/* Sidebar - Simple, clean, creator-friendly */}
      <aside style={{ width: '240px', background: '#FFFFFF', borderRight: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '32px 24px 24px' }}>
          <Link href="/" style={{ display: 'block' }}>
            <Image src="/images/sarvalay-logo.png" alt="Sarvalay" width={110} height={32} style={{ height: 'auto' }} />
          </Link>
        </div>

        <nav style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, marginTop: '16px' }}>
          {artistNav.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
            return (
              <Link key={item.label} href={item.path} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '12px 16px', borderRadius: '12px',
                background: isActive ? '#111827' : 'transparent',
                color: isActive ? '#FFFFFF' : '#6B7280',
                textDecoration: 'none', fontWeight: isActive ? '600' : '500', fontSize: '0.9rem',
                transition: 'all 0.2s ease'
              }}>
                <item.icon size={18} style={{ color: isActive ? '#FFFFFF' : '#9CA3AF' }} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: '24px 16px' }}>
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            padding: '12px 16px', borderRadius: '12px', color: '#6B7280',
            textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem'
          }}>
            <LogOut size={18} style={{ color: '#9CA3AF' }} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
