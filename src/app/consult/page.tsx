'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Check, ArrowRight, ArrowLeft, Upload, Sparkles } from 'lucide-react';
import { createLead } from '@/app/actions/operations';


const STEPS = [
  'Service Type', 'Project Info', 'Space Details',
  'Image Upload', 'Style Prefs', 'IVDE Mockups', 'Book Slot', 'Confirmation'
];

const services = [
  { id: 'murals', label: 'Wall Murals', desc: 'Hand-crafted murals for any commercial wall', icon: '🎨' },
  { id: 'installations', label: 'Art Installations', desc: '3D & sculptural installations', icon: '🏛️' },
  { id: 'transformation', label: 'Space Transformation', desc: 'Full Interior art overhaul', icon: '✨' },
  { id: 'maintenance', label: 'Maintenance', desc: '3+5 year guarantee & restoration', icon: '🛡️' },
];

const styles = ['Heritage & Mandala', 'Abstract Geometric', 'Contemporary Modern', 'Folk & Tribal', 'Graffiti & Street Art', 'Botanical & Nature', 'Brand Identity Art', 'Minimalist'];

const slots = [
  { date: 'Tomorrow, May 15', times: ['10:00 AM', '2:00 PM', '4:00 PM'] },
  { date: 'Thu, May 16', times: ['11:00 AM', '3:00 PM'] },
  { date: 'Fri, May 17', times: ['10:00 AM', '12:00 PM', '5:00 PM'] },
];

export default function ConsultPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    service: '', name: '', email: '', phone: '', company: '', industry: '',
    location: '', dimensions: '', budget: '', timeline: '', style: '',
    generating: false, generated: false, slot: '', time: '',
  });

  const next = async () => {
    if (step === 5) {
      setData(d => ({ ...d, generating: true }));
      setTimeout(() => setData(d => ({ ...d, generating: false, generated: true })), 3000);
      setStep(s => Math.min(s + 1, 7));
    } else if (step === 6) {
      if (!data.name || !data.email || !data.phone) {
        alert("Please make sure you filled out your name, email, and phone in the previous steps!");
        setStep(1); // Go to step 1 contact info
        return;
      }
      setSubmitting(true);
      const res = await createLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        industry: data.industry,
        serviceType: data.service,
        location: data.location,
        dimensions: data.dimensions,
        budget: data.budget,
        timeline: data.timeline,
        style: data.style,
        notes: `Selected slot: ${data.slot} at ${data.time}`,
      });
      setSubmitting(false);
      if (res.success) {
        setStep(s => Math.min(s + 1, 7));
      } else {
        alert("Failed to save consultation request: " + res.error);
      }
    } else {
      setStep(s => Math.min(s + 1, 7));
    }
  };
  const back = () => setStep(s => Math.max(s - 1, 0));

  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
      <Navbar />
      <div style={{ paddingTop: '72px', maxWidth: '760px', margin: '0 auto', padding: '80px 24px' }}>

        {/* Progress */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Step {step + 1} of {STEPS.length}</span>
            <span style={{ color: 'var(--color-indigo-light)', fontSize: '0.8rem', fontWeight: '600' }}>{STEPS[step]}</span>
          </div>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${((step + 1) / STEPS.length) * 100}%`, background: 'linear-gradient(90deg, var(--color-indigo), var(--color-indigo))', borderRadius: '4px', transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: i < step ? 'var(--color-indigo-light)' : i === step ? 'var(--color-text-primary)' : 'var(--color-text-muted)', fontWeight: i === step ? '600' : '400' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: i < step ? 'var(--color-indigo)' : i === step ? 'rgba(179,18,23,0.3)' : 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', flexShrink: 0 }}>
                  {i < step ? <Check size={10} color="white" /> : i + 1}
                </div>
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="glass-card" style={{ padding: '40px' }}>

          {/* Step 0: Service */}
          {step === 0 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>What service do you need?</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '28px' }}>Select the primary service for your project.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {services.map(s => (
                  <button key={s.id} onClick={() => setData(d => ({ ...d, service: s.id }))} style={{ padding: '24px', borderRadius: '12px', border: `2px solid ${data.service === s.id ? 'var(--color-indigo)' : 'rgba(0,0,0,0.08)'}`, background: data.service === s.id ? 'rgba(179,18,23,0.1)' : 'rgba(0,0,0,0.02)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{s.icon}</div>
                    <div style={{ fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '4px' }}>{s.label}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Contact Info */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Tell us about yourself</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '28px' }}>Basic contact information to personalise your consultation.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { key: 'name', label: 'Full Name', placeholder: 'Rajesh Mehta', type: 'text' },
                  { key: 'email', label: 'Email Address', placeholder: 'rajesh@hotel.com', type: 'email' },
                  { key: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel' },
                  { key: 'company', label: 'Company / Hotel Name', placeholder: 'Radisson Blu Mumbai', type: 'text' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{f.label}</label>
                    <input id={`consult-${f.key}`} type={f.type} className="input-field" placeholder={f.placeholder} value={(data as any)[f.key]} onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))} />
                  </div>
                ))}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Industry</label>
                  <select id="consult-industry" className="input-field" value={data.industry} onChange={e => setData(d => ({ ...d, industry: e.target.value }))} style={{ cursor: 'pointer' }}>
                    <option value="">Select your industry...</option>
                    <option value="hotel">Hotel / Hospitality</option>
                    <option value="office">Corporate Office</option>
                    <option value="restaurant">Restaurant / F&B</option>
                    <option value="realestate">Real Estate / Developer</option>
                    <option value="retail">Retail / Showroom</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Space Details */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Project Specifics</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '28px' }}>Help us understand the scope of your project.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { key: 'location', label: 'City / Location', placeholder: 'Mumbai, Maharashtra', type: 'text', full: false },
                  { key: 'dimensions', label: 'Wall Dimensions (approx)', placeholder: 'e.g. 20ft x 10ft', type: 'text', full: false },
                  { key: 'budget', label: 'Budget Range', placeholder: '', type: 'select', full: false, opts: ['Under ₹1L', '₹1L – ₹3L', '₹3L – ₹5L', '₹5L – ₹10L', '₹10L+'] },
                  { key: 'timeline', label: 'Desired Timeline', placeholder: '', type: 'select', full: false, opts: ['ASAP (under 4 weeks)', '1–2 months', '2–3 months', 'Flexible'] },
                ].map(f => (
                  <div key={f.key} style={{ gridColumn: f.full ? '1 / -1' : 'auto' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{f.label}</label>
                    {f.type === 'select' ? (
                      <select id={`consult-${f.key}`} className="input-field" value={(data as any)[f.key]} onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))} style={{ cursor: 'pointer' }}>
                        <option value="">Select...</option>
                        {f.opts?.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input id={`consult-${f.key}`} type={f.type} className="input-field" placeholder={f.placeholder} value={(data as any)[f.key]} onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Image Upload */}
          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Upload Your Wall Photo</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '28px' }}>Upload a photo of your wall so our IVDE engine can generate AI mockups. JPG/PNG, min 1MP recommended.</p>
              <div style={{ border: '2px dashed rgba(179,18,23,0.35)', borderRadius: '16px', padding: '60px 24px', textAlign: 'center', background: 'rgba(179,18,23,0.04)', cursor: 'pointer', transition: 'all 0.3s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(179,18,23,0.6)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(179,18,23,0.35)'}>
                <Upload size={40} style={{ color: 'var(--color-indigo)', marginBottom: '16px', display: 'block', margin: '0 auto 16px' }} />
                <p style={{ color: 'var(--color-text-primary)', fontWeight: '600', marginBottom: '8px' }}>Drag & drop or click to upload</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>JPG, PNG up to 20MB</p>
                <input id="consult-upload" type="file" accept="image/*" style={{ display: 'none' }} />
                <label htmlFor="consult-upload" className="btn-secondary" style={{ cursor: 'pointer', display: 'inline-flex' }}>
                  <span>Choose File</span>
                </label>
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '16px', textAlign: 'center' }}>
                💡 No photo? You can skip this step — our team will collect photos during the site visit.
              </p>
            </div>
          )}

          {/* Step 4: Style Prefs */}
          {step === 4 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Style Preferences</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '28px' }}>Select the art styles that resonate most with your vision. You can choose multiple.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                {styles.map(s => (
                  <button key={s} onClick={() => setData(d => ({ ...d, style: d.style === s ? '' : s }))} style={{ padding: '16px', borderRadius: '10px', border: `2px solid ${data.style === s ? 'var(--color-indigo)' : 'rgba(0,0,0,0.08)'}`, background: data.style === s ? 'rgba(179,18,23,0.15)' : 'rgba(0,0,0,0.02)', cursor: 'pointer', fontSize: '0.88rem', fontWeight: '500', color: data.style === s ? 'var(--color-indigo-light)' : 'var(--color-text-secondary)', transition: 'all 0.2s ease', textAlign: 'center' }}>
                    {s}
                  </button>
                ))}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Additional Notes / Inspiration</label>
                <textarea id="consult-notes" className="input-field" rows={3} placeholder="Share any mood references, color preferences, or specific themes you have in mind..." style={{ resize: 'vertical' }} />
              </div>
            </div>
          )}

          {/* Step 5: IVDE Mockups */}
          {step === 5 && (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                <Sparkles size={28} style={{ color: 'var(--color-indigo)', display: 'inline', marginRight: '8px' }} />
                AI Mockups Ready
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>Our IVDE engine has generated 10 design variations for your wall. Preview below.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
                {[1, 2, 3, 4].map(n => (
                  <div key={n} style={{ borderRadius: '10px', overflow: 'hidden', position: 'relative', height: '140px', background: `linear-gradient(135deg, hsl(${n * 40}, 60%, 15%), hsl(${n * 40 + 40}, 50%, 20%))`, border: '1px solid rgba(179,18,23,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-indigo)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(179,18,23,0.2)'}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>🎨</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Variation {n}</div>
                    </div>
                    <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                      <span className="badge badge-gold" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>AI</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card" style={{ padding: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontSize: '2rem' }}>💡</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '600', color: 'var(--color-text-primary)', marginBottom: '4px', fontSize: '0.9rem' }}>Your full mockups will be sent to your dashboard</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>All 10 variations with before/after comparison, high-res downloads, and revision request tools.</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Book Slot */}
          {step === 6 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '8px' }}>Book Your Consultation Call</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '28px' }}>Choose a convenient slot for a 30-minute strategy call with our project team.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {slots.map(slot => (
                  <div key={slot.date}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>{slot.date}</div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {slot.times.map(time => (
                        <button key={time} onClick={() => setData(d => ({ ...d, slot: slot.date, time }))} style={{ padding: '10px 20px', borderRadius: '8px', border: `2px solid ${data.slot === slot.date && data.time === time ? 'var(--color-indigo)' : 'rgba(0,0,0,0.12)'}`, background: data.slot === slot.date && data.time === time ? 'rgba(179,18,23,0.15)' : 'rgba(0,0,0,0.03)', cursor: 'pointer', color: data.slot === slot.date && data.time === time ? 'var(--color-indigo-light)' : 'var(--color-text-secondary)', fontWeight: '500', fontSize: '0.9rem', transition: 'all 0.2s ease' }}>
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(179,18,23,0.06)', borderRadius: '10px', border: '1px solid rgba(179,18,23,0.15)', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                📞 Alternatively, call us directly at <a href="tel:+918440056993" style={{ color: 'var(--color-indigo-light)' }}>+91 84400-56993</a> or <a href="https://wa.me/918440056993" style={{ color: '#25D366' }}>WhatsApp us</a>
              </div>
            </div>
          )}

          {/* Step 7: Confirmation */}
          {step === 7 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, var(--color-indigo), #4ade80)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <Check size={32} color="white" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '12px' }}>
                You&apos;re All Set! 🎉
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
                Your consultation has been booked. Check your email for the calendar invite and meeting link. We&apos;re excited to transform your space!
              </p>
              {data.slot && (
                <div className="glass-card" style={{ padding: '20px', marginBottom: '32px', display: 'inline-flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ fontSize: '1.5rem' }}>📅</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '2px' }}>YOUR CONSULTATION</div>
                    <div style={{ fontWeight: '700', color: 'var(--color-text-primary)' }}>{data.slot} at {data.time}</div>
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/" className="btn-secondary"><span>Back to Home</span></Link>
                <Link href="/contact" className="btn-primary"><span>Talk to Us Now →</span></Link>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 7 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button onClick={back} disabled={step === 0} className="btn-secondary" style={{ opacity: step === 0 ? 0.4 : 1, cursor: step === 0 ? 'default' : 'poPoppins' }}>
                <ArrowLeft size={16} /><span>Back</span>
              </button>
              <button onClick={next} disabled={submitting} className="btn-primary" style={{ opacity: submitting ? 0.75 : 1 }}>
                <span>{submitting ? 'Booking...' : step === 5 ? 'Book Consultation' : step === 6 ? 'Confirm Booking' : 'Continue'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Trust indicators */}
        {step < 7 && (
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
            {['🔒 100% Free, Zero Commitment', '⚡ AI Mockups in 48 Hours', '🛡️ 8-Year Comprehensive Guarantee'].map(t => (
              <span key={t} style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
