import "@/styles/globals.css"

import { Inter as FontSans } from "@next/font/google"
import clsx from "clsx"
import { getServerSession } from "next-auth/next"

import { AnalyticsWrapper } from "@/components/analytics"
import Providers from "@/components/providers"
import Sidebar from "@/components/sidebar"
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
    icon: "/favicon.ico",
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
          <div className="flex">
            <Sidebar />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
