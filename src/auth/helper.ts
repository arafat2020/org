import prisma from "@/lib/db";
import NextAuth, { NextAuthConfig, } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as argon2 from "argon2"


export const BASE_PATH = "/api/auth";

type User = {
    name: string,
    email: string,
    role: string,
}

const authOptions: NextAuthConfig = {
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Your Name" },
                password: { label: "Password", type: "password", placeholder: "Your Password" },
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials) throw new Error("Credentials are required");

                const user = await prisma.user.findUnique({
                    where: {
                        name: credentials.username as string,
                    },
                });

                if (!user) throw new Error("User does not exist");
                if (!credentials.password) throw new Error("Password required");

                const isPasswordValid = await argon2.verify(user.password, credentials.password as string);
                if (isPasswordValid) {
                    return {
                        name: user.name,
                        email: user.email,
                        role: user.UserRole,
                    };
                } else {
                    throw new Error("Wrong password");
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
