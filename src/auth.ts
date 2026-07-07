import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// MOCK AUTH — for frontend testing only, before the backend exists.
// Google OAuth and the real `/auth/login` backend call are disabled here
// (both require infra that isn't built yet). Any email/password combo
// signs in as a fake user. Swap this back to a real backend call
// (see git history) once `POST /auth/login` exists.
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = String(credentials.email);
        return {
          id: `mock_${Buffer.from(email).toString("hex").slice(0, 12)}`,
          email,
          name: email.split("@")[0],
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
      }
      return session;
    },
  },
});
