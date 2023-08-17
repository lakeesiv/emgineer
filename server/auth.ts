import { type NextAuthConfig, type DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { DrizzleAdapter } from "lib/adapter";
import { db } from "lib/db";
import { AdapterUser } from "@auth/core/adapters";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      crsid: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthConfig = {
  callbacks: {
    session: ({ session, token, user }) => {
      const crsid = user.email.split("@")[0];
      // console.log(user);

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          crsid,
        },
      };
    },
    signIn: async ({ account, profile }) => {
      if (
        account?.provider === "google" &&
        (process.env.NODE_ENV === "development" ||
          profile?.email?.endsWith("@cam.ac.uk"))
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization:
        process.env.NODE_ENV === "production"
          ? "https://accounts.google.com/o/oauth2/auth?response_type=code&hd=cam.ac.uk&prompt=consent&access_type=offline"
          : undefined, // Only use cam.ac.uk accounts in production
    }),
  ],
};

export interface Session {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
    crsid: string;
  };
}

export const {
  handlers: { GET, POST },
  auth: _auth,
} = NextAuth(authOptions);

export const auth = _auth as unknown as () => Promise<Session | null>;

export const getServerAuthSession = () =>
  _auth() as unknown as Promise<Session | null>;
