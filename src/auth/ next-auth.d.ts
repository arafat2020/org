// next-auth.d.ts
import NextAuth from "next-auth";

// Extend the User type to include the role property
declare module "next-auth" {
  interface User {
    role: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email?: string;
      role: string;  // Add role here
    };
  }

  interface JWT {
    role: string;
  }
}
