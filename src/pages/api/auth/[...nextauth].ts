import { PrismaAdapter } from "@next-auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      session.user.username = user.username
      return session
    },
  },
  events: {
    createUser: async ({ user }) => {
      const { email } = user
      let newUsername = email?.split("@")[0]
      const existingUser = await db.user.findUnique({
        where: { username: newUsername },
      })
      if (existingUser) {
        newUsername = `${newUsername}${Math.floor(Math.random() * 1000)}`
      }
      await db.user.update({
        where: { id: user.id },
        data: { username: newUsername },
      })
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
}

export default NextAuth(authOptions)
