"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

interface ProtectedClientProps {
  children: React.ReactNode
}

const ProtectedClient = ({ children }: ProtectedClientProps) => {
  const router = useRouter()
  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/")
    },
  })

  return <>{children}</>
}

export default ProtectedClient
