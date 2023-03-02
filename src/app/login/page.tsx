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
    <div className="flex h-full flex-col items-center justify-center gap-10 p-10">
      <div className="flex flex-col gap-8">
        <p className="text-center font-medium opacity-80">
          Hey there! Sign in and enjoy <strong>Bookmarkxyz</strong>!
        </p>
        <button
          onClick={() => signIn("github", { callbackUrl: "/profile" })}
          className={clsx(
            "flex w-full items-center justify-center gap-2 py-2 text-sm",
            "rounded-lg border border-gray-7 bg-gray-4 font-medium shadow-md",
            "hover:opacity-80 motion-safe:duration-150 motion-safe:ease-productive-standard",
          )}
        >
          <Github size={18} />
          <span>
            Sign in with <strong>Github</strong>
          </span>
        </button>
      </div>
    </div>
  )
}
