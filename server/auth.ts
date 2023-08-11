import { type NextAuthConfig, type DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthConfig = {
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    signIn: async ({ account, profile }) => {
      if (
        account?.provider === "google" &&
        profile?.email?.endsWith("@cam.ac.uk")
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization:
        "https://accounts.google.com/o/oauth2/auth?response_type=code&hd=cam.ac.uk&prompt=consent&access_type=offline",
    }),
  ],
};

interface Session {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
}

export const {
  handlers: { GET, POST },
  auth: _auth,
} = NextAuth(authOptions);

export const auth = _auth as unknown as () => Promise<Session | null>;

export const getServerAuthSession = () =>
  _auth() as unknown as Promise<Session | null>;
