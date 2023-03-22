import "@/styles/globals.css"

import { Inter as FontSans } from "@next/font/google"
import { Analytics } from "@vercel/analytics/react"
import clsx from "clsx"
import { getServerSession } from "next-auth/next"

import Navbar from "@/components/navbar"
import Providers from "@/components/providers"
import SessionContext from "@/components/session-context"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata = {
  title: {
    default: "bookmarkxyz",
    template: "%s | bookmarkxyz",
  },
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx("font-sans", fontSans.variable)}>
        <Providers session={session}>
          <SessionContext>
            <Navbar />
            <main className="flex max-h-screen flex-col pt-16 md:ml-16 md:pt-4">
              {children}
              <Analytics />
            </main>
          </SessionContext>
        </Providers>
      </body>
    </html>
  )
}
