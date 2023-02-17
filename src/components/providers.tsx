"use client"

import { TooltipProvider } from "@radix-ui/react-tooltip"
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
interface ProvidersProps {
  children: React.ReactNode
  session: Session | null
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
