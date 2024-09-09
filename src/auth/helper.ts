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
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
              token.role = user.role
            }
            return token
          },
          session({ session, token }) {
            session.user.role = token.role as string
            return session
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
                const siExist = await prisma.user.findUnique({
                    where: {
                        name: credentials?.username as string
                    }
                })

                if (!siExist) throw new Error("User no exist")

                if (!credentials?.password) throw new Error("Password required")

                if (await argon2.verify(siExist.password, credentials.password as string)) {
                    return {
                        name: siExist.name,
                        email: siExist.email,
                        role: siExist.UserRole
                    } 
                } else {
                    throw new Error("Wrong Password")
                }

            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);