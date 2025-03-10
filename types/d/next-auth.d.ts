import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      sid?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      // Add any custom properties you want
      role?: string;
      permissions?: string[];
      // etc.
    };
    // You can also add top-level session properties
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    // Add any custom properties you want in the JWT
    role?: string;
    permissions?: string[];
  }
}
