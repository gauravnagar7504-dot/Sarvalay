'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

const FALLBACK_POSTS = [
  { slug: 'wall-murals-hotel-lobbies', title: '7 Reasons Wall Murals Are Becoming Non-Negotiable for 5-Star Hotels', category: 'Hospitality Aesthetics', readTime: '6 min', date: 'May 10, 2026', excerpt: 'From The Taj to boutique properties, hospitality leaders are discovering that curated wall art dramatically increases guest dwell time, social shares, and review scores.' },
  { slug: 'office-art-productivity', title: 'The ROI of Office Art: How Indian Corporates Are Using Murals to Win Talent Wars', category: 'Office Transformation', readTime: '5 min', date: 'May 5, 2026', excerpt: 'Research shows that employees in art-rich environments are 17% more productive. Here\'s how India\'s top corporates are leveraging commercial art for culture-building.' },
  { slug: 'ai-mockup-revolution', title: 'How AI is Changing Commercial Art — Sarvalay\'s IVDE Engine Explained', category: 'Interior Art Trends', readTime: '8 min', date: 'April 28, 2026', excerpt: 'Traditional art procurement was always a leap of faith. Sarvalay\'s IVDE engine ends that — generating photorealistic wall mockups in under 3 minutes.' },
  { slug: 'restaurant-design-murals', title: 'Restaurant Instagrammability: Why Your Wall Art is Your Marketing Budget', category: 'Hospitality Aesthetics', readTime: '5 min', date: 'April 20, 2026', excerpt: 'In the age of food content, the most shareable restaurants aren\'t those with the best menus — they\'re those with the most compelling visual environments.' },
  { slug: 'verified-artist-network', title: 'Why India\'s Commercial Art Sector Needs Vetted Artist Networks, Not Just Freelancers', category: 'Interior Art Trends', readTime: '7 min', date: 'April 12, 2026', excerpt: 'The hidden cost of working with unverified freelancers: delays, quality inconsistencies, no recourse. The case for managed artist networks.' },
  { slug: 'mural-maintenance-guide', title: 'How to Maintain Your Commercial Wall Mural: A Complete Guide', category: 'Office Transformation', readTime: '4 min', date: 'April 5, 2026', excerpt: 'Wall murals are long-term investments. With the right care and guarantee, they can look pristine for 5+ years.' },
];

const categories = ['All', 'Hospitality Aesthetics', 'Office Transformation', 'Interior Art Trends'];
const catColors: Record<string, string> = { 'Hospitality Aesthetics': 'gold', 'Office Transformation': 'indigo', 'Interior Art Trends': 'gold' };

interface BlogClientProps {
  initialPosts: any[];
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const [filter, setFilter] = useState('All');

  // If no posts are retrieved from Sanity, merge or use fallback list
  const activePosts = initialPosts && initialPosts.length > 0 
    ? initialPosts.map(p => ({
        slug: p.slug,
        title: p.title,
        category: p.category || 'Interior Art Trends',
        readTime: p.readTime || '5 min',
        date: new Date(p.publishedAt || Date.now()).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        excerpt: p.excerpt || 'Published via Sarvalay Sanity Headless CMS Portal.'
      }))
    : FALLBACK_POSTS;

  const filtered = filter === 'All' 
    ? activePosts 
    : activePosts.filter(p => p.category === filter);

  return (
    <div>
      <section style={{ padding: '80px 24px 48px', textAlign: 'center', maxWidth: '740px', margin: '0 auto' }}>
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>Resources</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
          The <span className="gradient-text">Art Infrastructure</span> Blog
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
          Insights on commercial art, hospitality design, and India&apos;s evolving art economy.
        </p>
      </section>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '0 24px 48px', flexWrap: 'wrap' }}>
        {categories.map(c => (
          <button 
            key={c} 
            onClick={() => setFilter(c)} 
            style={{ 
              padding: '8px 20px', 
              borderRadius: '20px', 
              border: '1px solid', 
              fontSize: '0.85rem', 
              fontWeight: '500', 
              cursor: 'pointer', 
              transition: 'all 0.2s ease', 
              background: filter === c ? 'var(--color-indigo)' : 'transparent', 
              color: filter === c ? 'white' : 'var(--color-text-secondary)', 
              borderColor: filter === c ? 'var(--color-indigo)' : 'rgba(0,0,0,0.12)' 
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {filtered.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
            <article className="glass-card" style={{ padding: '28px', height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
              <span className={`badge badge-${catColors[post.category] || 'indigo'}`} style={{ marginBottom: '16px', alignSelf: 'flex-start' }}>{post.category}</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-text-primary)', lineHeight: '1.4', marginBottom: '12px', flex: 1 }}>{post.title}</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '20px' }}>{post.excerpt}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', gap: '12px', color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} />{post.readTime}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} />{post.date}</span>
                </div>
                <ArrowRight size={14} style={{ color: 'var(--color-indigo)' }} />
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Newsletter */}
      <div style={{ background: 'rgba(179,18,23,0.05)', borderTop: '1px solid rgba(179,18,23,0.1)', padding: '64px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '12px' }}>Get Art Insights in Your Inbox</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>Monthly insights on commercial art trends and project showcases.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <input type="email" placeholder="your@company.com" className="input-field" style={{ maxWidth: '320px' }} id="newsletter-email" />
          <button className="btn-primary"><span>Subscribe</span></button>
        </div>
      </div>
    </div>
  );
}
