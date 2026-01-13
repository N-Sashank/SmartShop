import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

console.log('URL:', process.env.DATABASE_URL);

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

await prisma.$connect();
console.log('Connected OK');
await prisma.$disconnect();
