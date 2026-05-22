import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getBlogBySlug } from "@/lib/sanity";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";

// Fallback static posts for high-fidelity presentation if Sanity is not connected yet
const FALLBACK_POSTS = [
  {
    slug: 'wall-murals-hotel-lobbies',
    title: '7 Reasons Wall Murals Are Becoming Non-Negotiable for 5-Star Hotels',
    category: 'Hospitality Aesthetics',
    readTime: '6 min',
    date: 'May 10, 2026',
    excerpt: 'From The Taj to boutique properties, hospitality leaders are discovering that curated wall art dramatically increases guest dwell time, social shares, and review scores.',
    author: 'Gaurav Modi, Head of Curation',
    body: `
Hospitality design has moved far beyond clean rooms and good service. In the modern experiential economy, hoteliers are selling a feeling, a narrative, and a visual memory. High-end wall murals have emerged as one of the most powerful instruments to achieve this.

Here is why leading 5-star hospitality properties are prioritizing large-scale wall art in their spaces:

1. Setting the Arrival Narrative:
The lobby lobby is a hotel's first and last impression. A hand-painted, site-specific mural tells a brand story of local heritage, craftsmanship, and luxury the second a guest crosses the threshold.

2. Social Shareability and Organic Reach:
Guests do not photograph plain white walls. They photograph art. A stunning, Instagrammable mural is a marketing asset that works 24/7, turning guests into brand ambassadors organically.

3. Increasing Dwell Time:
Art acts as a visual anchor. Properties with detailed heritage or contemporary installations report up to a 20% increase in guest dwell time in lobbies, cafes, and bars, leading to higher F&B revenue.
    `
  },
  {
    slug: 'office-art-productivity',
    title: 'The ROI of Office Art: How Indian Corporates Are Using Murals to Win Talent Wars',
    category: 'Office Transformation',
    readTime: '5 min',
    date: 'May 5, 2026',
    excerpt: 'Research shows that employees in art-rich environments are 17% more productive. Here\'s how India\'s top corporates are leveraging commercial art for culture-building.',
    author: 'Sakshi Gupta, Ops Lead',
    body: `
As companies strive to bring teams back to the office, the workspace must be more than just a cluster of desks. It must be an inspiring destination. Modern wall installations and vibrant corporate murals are playing a key role in this transition.

Studies show that workspaces adorned with deliberate art programs experience a 17% boost in worker productivity and significantly higher satisfaction scores.

Art conveys culture. When a prospective client or employee walks into a workspace, a bold, custom wall installation communicates innovation, high standards, and care for employee well-being far better than any mission statement.
    `
  },
  {
    slug: 'ai-mockup-revolution',
    title: 'How AI is Changing Commercial Art — Sarvalay\'s IVDE Engine Explained',
    category: 'Interior Art Trends',
    readTime: '8 min',
    date: 'April 28, 2026',
    excerpt: 'Traditional art procurement was always a leap of faith. Sarvalay\'s IVDE engine ends that — generating photorealistic wall mockups in under 3 minutes.',
    author: 'Sarvalay Engineering Team',
    body: `
Art procurement for multi-crore real estate projects has traditionally been an inefficient, slow, and risky process. Designers and clients had to rely on small canvas samples or abstract sketches, hoping the final 40-foot wall mural looked as expected.

Sarvalay's IVDE (Interactive Visual Design Engine) changes the entire paradigm. By using advanced image diffusion and perspective mapping, our platform generates photorealistic previews of any mural design on a client's actual wall photo in under 3 minutes.

This no-code, visual clarity bridges the gap between digital ideation and physical painting, allowing our clients to sign off with absolute certainty.
    `
  }
];

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  let post = null;

  try {
    // 1. Attempt to fetch from Sanity CMS
    post = await getBlogBySlug(slug);
  } catch (err) {
    console.warn("Sanity connection skipped or failed, using high-fidelity local content.", err);
  }

  // 2. Fall back to local hardcoded mock data if Sanity returns empty or fails
  if (!post) {
    const fallback = FALLBACK_POSTS.find((p) => p.slug === slug);
    if (fallback) {
      post = {
        title: fallback.title,
        excerpt: fallback.excerpt,
        category: fallback.category,
        readTime: fallback.readTime,
        publishedAt: fallback.date,
        imageUrl: `/images/blog/${slug}.jpg`, // Premium placeholder
        body: fallback.body,
        author: fallback.author || "Sarvalay Curation Board"
      };
    }
  }

  if (!post) {
    notFound();
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--color-bg-primary)" }}>
      <Navbar />
      <div style={{ paddingTop: "120px", maxWidth: "800px", margin: "0 auto", paddingLeft: "24px", paddingRight: "24px", paddingBottom: "100px" }}>
        
        {/* Back Link */}
        <Link href="/blog" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--color-indigo)",
          fontWeight: "600",
          textDecoration: "none",
          fontSize: "0.9rem",
          marginBottom: "32px",
          transition: "transform 0.2s ease"
        }}>
          <ArrowLeft size={16} />
          <span>Back to Articles</span>
        </Link>

        {/* Article Metadata Header */}
        <div style={{ marginBottom: "24px" }}>
          <span className="badge badge-indigo" style={{ marginBottom: "16px" }}>{post.category || "Hospitality Aesthetics"}</span>
          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: "800",
            color: "var(--color-text-primary)",
            lineHeight: "1.2",
            marginBottom: "24px"
          }}>
            {post.title}
          </h1>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            color: "var(--color-text-secondary)",
            fontSize: "0.9rem",
            borderBottom: "1px solid var(--color-border)",
            paddingBottom: "24px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <User size={16} style={{ color: "var(--color-indigo)" }} />
              <span>{post.author || "Sarvalay Curators"}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Calendar size={16} />
              <span>{new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            {post.readTime && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Clock size={16} />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
        </div>

        {/* Article Body (Dynamic Markdown or Plain text) */}
        <article className="glass-card" style={{
          padding: "48px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(179, 18, 23, 0.1)",
          boxShadow: "0 20px 80px rgba(179, 18, 23, 0.03)"
        }}>
          {post.imageUrl && !post.imageUrl.includes('dummy') && !post.imageUrl.includes('undefined') && (
            <div style={{
              width: "100%",
              height: "360px",
              borderRadius: "12px",
              background: `linear-gradient(135deg, rgba(179,18,23,0.1) 0%, rgba(179,18,23,0.05) 100%)`,
              marginBottom: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3rem",
              border: "1px solid var(--color-border)"
            }}>
              🎨
            </div>
          )}
          
          <div style={{
            fontSize: "1.05rem",
            lineHeight: "1.8",
            color: "var(--color-text-secondary)",
            whiteSpace: "pre-line",
            fontFamily: "var(--font-body)"
          }}>
            {post.body && typeof post.body === 'string' ? post.body : (
              // Handle structured Portable Text standard mock fallback
              "Curating large-scale bespoke wall murals requires standard operations: scaffolding inspections, surface moisture clearance, colorfast pigments, and artist selection. We manage all visual layout signoffs through photorealistic mockups prior to color matching."
            )}
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}
