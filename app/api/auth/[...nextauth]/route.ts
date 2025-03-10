import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { UserService } from "@/services/userService";
import { UserDataInput } from "@/types/user";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt", // Use stateless JWT sessions
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Only run this code when the user signs in
      if (user) {
        // Now it's safe to access user.email
        if (user.email) {
          const existingUser = await UserService.getUserByEmailOptional(
            user.email
          );
          if (existingUser) {
            token.id = existingUser.sid;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.image = existingUser.imageUrl;
          } else {
            const newUserData: UserDataInput = {
              email: user.email,
              name: user.name ?? null,
              phoneNumber: null,
              imageUrl: user.image ?? null,
            };
            const newUser = await UserService.createUser(newUserData);
            token.id = newUser.sid;
            token.name = newUser.name;
            token.email = newUser.email;
            token.image = newUser.imageUrl;
          }
        }
      }

      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.sid = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image as string | null;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
