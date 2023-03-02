"use client"

import { redirect } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

export default function Profile() {
  const { data, status } = useSession()

  if (status === "unauthenticated") {
    redirect("/login")
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 p-10">
      <div className="flex flex-col gap-8">
        <p className="text-center font-medium opacity-80">
          Logged in as <strong>{data?.user.name}</strong>
        </p>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full rounded-lg bg-gray-5 py-2 text-center text-sm font-medium text-gray-12 shadow-md hover:opacity-80 motion-safe:duration-150 motion-safe:ease-productive-standard"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
