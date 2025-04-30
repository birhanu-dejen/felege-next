// lib/prisma.ts

import { PrismaClient } from "@prisma/client";

// Add PrismaClient to the NodeJS global type to prevent hot-reload issues
declare global {
  // allow global `var` in TypeScript
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const db = prisma;
