import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // Use non-null assertion
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Use non-null assertion
    }),
  ],
  callbacks: {
    async session(session, token) {
      session.user.id = token.sub;
      return session;
    },
  },
});
