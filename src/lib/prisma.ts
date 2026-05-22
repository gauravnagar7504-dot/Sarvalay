import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL;
  if (url && (url.startsWith('prisma://') || url.startsWith('prisma+postgres://'))) {
    return new PrismaClient({
      accelerateUrl: url,
    });
  }
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
