export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-secondary)' }}>
      {children}
    </div>
  );
}
