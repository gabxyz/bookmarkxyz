import { User } from "lucide-react"
import { redirect } from "next/navigation"

import { SignIn } from "@/components/auth-button"
import { getCurrentUser } from "@/lib/session"

export default async function Login() {
  const user = await getCurrentUser()

  if (user) {
    redirect("/profile/me")
  }

  return (
    <div className="flex h-full w-full flex-col gap-4 p-10">
      <h2 className="flex items-end gap-2 border-b border-gray-6 pb-4 text-xl font-semibold">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-8 bg-gray-4 text-gray-11">
          <User size={16} />
        </div>
        <p>Log in</p>
      </h2>
      <div className="flex flex-col items-center justify-center">
        <p className="mb-8 text-center font-medium opacity-80">
          Hello! Please log in to an existing account or create a new profile to
          continue.
        </p>
        <div className="flex w-full flex-col items-center gap-3">
          <SignIn />
        </div>
      </div>
    </div>
  )
}
