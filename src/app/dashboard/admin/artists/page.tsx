import { prisma } from '@/lib/prisma';
import ArtistsClient from './ArtistsClient';

export const dynamic = 'force-dynamic';

export default async function AdminArtistsPage() {
  const artists = await prisma.user.findMany({
    where: {
      role: 'ARTIST',
    },
    include: {
      artistProfile: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <ArtistsClient initialArtists={artists} />;
}
