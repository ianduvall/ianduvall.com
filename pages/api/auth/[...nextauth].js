import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '@/lib/db';

export default NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  debug: process.env.NODE_ENV !== 'production',
  useSecureCookies: process.env.NODE_ENV === 'production',
});
