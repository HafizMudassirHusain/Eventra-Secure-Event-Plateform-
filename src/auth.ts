import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { apiUrl } from "@/lib/api";
import { Role } from "@/types/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(apiUrl("/auth/login"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) return null;

        const data = await res.json();
        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          accessToken: data.accessToken as string,
          role: data.user.role as Role,
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
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = (user as { accessToken?: string }).accessToken;
        token.role = (user as { role?: Role }).role;
      }
      if (trigger === "update" && session) {
        if (session.accessToken) token.accessToken = session.accessToken;
        if (session.role) token.role = session.role as Role;
        if (session.name) token.name = session.name as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as Role | undefined) ?? "USER";
      }
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
