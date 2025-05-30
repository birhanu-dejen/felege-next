import { PrismaClient } from "@prisma/client";

declare global {
  //  should not  removed this is eslint bypass
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const db = prisma;
