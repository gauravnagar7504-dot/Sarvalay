'use client';
import { PlayCircle, ShieldCheck, FileText, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';

export default function ArtistTrainingPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>SOP Academy & Training</h1>
        <p style={{ color: '#6B7280' }}>Access luxury execution protocols, site safety guidelines, and certification courses to unlock Tier 1 projects.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px' }}>
        {/* Main Columns: Training Videos */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '700', color: '#111827', marginBottom: '20px' }}>Mandatory Certification Courses</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              <TrainingVideoCard 
                title="SOP-09: Scaffolding Safety & Rigging"
                duration="15 Mins"
                desc="Learn OSHA height limits, scaffolding support locking mechanisms, and harness rigging protocols."
                status="Verified"
              />
              <TrainingVideoCard 
                title="SOP-12: Gold Leaf Gilding Techniques"
                duration="22 Mins"
                desc="Master high-precision metallic foil bonding, sizing, and protective varnishing protocols."
                status="Verified"
              />
              <TrainingVideoCard 
                title="SOP-04: Acrylic Wall Prepping"
                duration="10 Mins"
                desc="Surface sanding grit choices, dampness control metrics, and premium base primer coating guide."
                status="Verified"
              />
              <TrainingVideoCard 
                title="SOP-15: Commercial Protective Varnishes"
                duration="18 Mins"
                desc="Application of anti-graffiti clear coatings, UV protection layer standards for high-traffic hotel lobbies."
                status="In Progress"
              />
            </div>
          </div>

        </section>

        {/* Sidebar: Certification Progress */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>Your Credentials</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ paddingBottom: '16px', borderBottom: '1px solid #F3F4F6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#4B5563', marginBottom: '8px', fontWeight: '600' }}>
                  <span>SOP Compliance</span>
                  <span>85% (Tier 1 Ready)</span>
                </div>
                <div style={{ height: '6px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', background: '#4F46E5' }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#065F46', background: '#D1FAE5', padding: '12px', borderRadius: '8px', fontWeight: '600' }}>
                <ShieldCheck size={18} /> Verified Tier 1 Partner
              </div>
            </div>
          </div>

          <div style={{ background: '#111827', borderRadius: '16px', padding: '24px', color: 'white' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '700', marginBottom: '12px' }}>Downloads Desk</h2>
            <p style={{ fontSize: '0.82rem', color: '#9CA3AF', marginBottom: '16px', lineHeight: '1.5' }}>Get access to offline safety standard brochures and project guidelines books.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white', textDecoration: 'none', fontSize: '0.85rem', background: 'rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '8px' }}>
                <span>📖 Safety Regulations.pdf</span> <ExternalLink size={14} />
              </a>
              <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white', textDecoration: 'none', fontSize: '0.85rem', background: 'rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '8px' }}>
                <span>🎨 Materials SOP Guide.pdf</span> <ExternalLink size={14} />
              </a>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}

function TrainingVideoCard({ title, duration, desc, status }: any) {
  const isVerified = status === 'Verified';
  return (
    <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '220px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{duration} VIDEO</span>
          <span className="badge" style={{ background: isVerified ? '#D1FAE5' : '#FEF3C7', color: isVerified ? '#065F46' : '#D97706', fontSize: '0.65rem', padding: '2px 8px' }}>{status}</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>{title}</h3>
        <p style={{ fontSize: '0.82rem', color: '#6B7280', lineHeight: '1.4' }}>{desc}</p>
      </div>
      <button style={{ border: 'none', background: 'transparent', color: '#4F46E5', fontWeight: '700', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '0', alignSelf: 'flex-start', marginTop: '12px' }}>
        <PlayCircle size={16} /> Watch Training Video
      </button>
    </div>
  );
}
