import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getBlogs } from '@/lib/sanity';
import BlogClient from './BlogClient';

export const revalidate = 60; // Revalidate dynamic blog cache every 60 seconds (ISR)

export default async function BlogPage() {
  let sanityPosts = [];
  try {
    sanityPosts = await getBlogs();
  } catch (err) {
    console.warn("Sanity connection skipped or not yet configured. Displaying high-fidelity local content.", err);
  }

  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: '72px' }}>
        <BlogClient initialPosts={sanityPosts} />
      </div>
      <Footer />
    </main>
  );
}
