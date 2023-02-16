"use client"

import clsx from "clsx"
import { Github } from "lucide-react"
import { redirect } from "next/navigation"
import { signIn, useSession } from "next-auth/react"

export default function Login() {
  const { status } = useSession()

  if (status === "authenticated") {
    redirect("/profile")
  }
  return (
    <main className="flex h-full items-center justify-center">
      <button
        onClick={() => signIn("github", { callbackUrl: "/profile" })}
        className={clsx(
          "flex items-center gap-2 px-4 py-2 text-sm font-medium ",
          "rounded-lg  border border-gray-7 bg-gray-4 shadow-md",
          "hover:opacity-80 motion-safe:duration-150 motion-safe:ease-productive-standard",
        )}
      >
        <Github size={18} />
        <span>Sign in with Github</span>
      </button>
    </main>
  )
}
