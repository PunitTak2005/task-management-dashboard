// src/prisma/client.ts
import { PrismaClient } from '@prisma/client';

// Singleton Prisma Client to avoid multiple instances in hot reload
let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // In development, attach to global for reuse across module reloads
  // @ts-ignore
  if (!global.__prisma) {
    // @ts-ignore
    global.__prisma = new PrismaClient();
  }
  // @ts-ignore
  prisma = global.__prisma;
}
export default prisma;
