"use client"

import { redirect } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

export default function Profile() {
  const { data, status } = useSession()

  if (status === "unauthenticated") {
    redirect("/login")
  }

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <p>hey {data?.user?.name}</p>

      <button onClick={() => signOut({ callbackUrl: "/" })}>sign out</button>
    </main>
  )
}
