"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

interface SessionContextProps {
  children: React.ReactNode
}

const SessionContext = ({ children }: SessionContextProps) => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    router.refresh()
  }, [session, router])
  return <>{children}</>
}

export default SessionContext
