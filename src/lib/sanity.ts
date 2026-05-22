import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-23',
  useCdn: true,
});

// A clean utility to query blogs dynamically
export async function getBlogs() {
  return await sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      id,
      title,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      publishedAt,
      excerpt,
      body
    }
  `);
}

export async function getBlogBySlug(slug: string) {
  return await sanityClient.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      id,
      title,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      publishedAt,
      excerpt,
      body
    }
  `, { slug });
}
