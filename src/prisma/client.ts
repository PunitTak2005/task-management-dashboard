import { PrismaClient } from '@prisma/client';

let prismaInstance: PrismaClient | null = null;

function getPrismaInstance(): PrismaClient {
  if (!prismaInstance) {
    if (process.env.NODE_ENV === 'production') {
      prismaInstance = new PrismaClient();
    } else {
      // @ts-ignore
      if (!global.__prisma) {
        // @ts-ignore
        global.__prisma = new PrismaClient();
      }
      // @ts-ignore
      prismaInstance = global.__prisma;
    }
  }
  return prismaInstance!;
}

const prisma = new Proxy({} as PrismaClient, {
  get(target, prop, receiver) {
    // If it's a Promise method (like then/catch/finally), let it resolve to target
    if (prop === 'then' || prop === 'catch' || prop === 'finally') {
      return undefined;
    }
    const instance = getPrismaInstance();
    const value = Reflect.get(instance, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  }
});

export default prisma;
