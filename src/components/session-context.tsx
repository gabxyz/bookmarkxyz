"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import { useEffect } from "react"

interface SessionContextProps {
  children: React.ReactNode
}

const SessionContext = ({ children }: SessionContextProps) => {
  const { data: session } = useSession()
  const { theme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    router.refresh()
  }, [session, router, theme])
  return <>{children}</>
}

export default SessionContext
