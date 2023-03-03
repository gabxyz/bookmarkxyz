import { redirect } from "next/navigation"

import { SignIn } from "@/components/auth-button"
import { getCurrentUser } from "@/lib/session"

export default async function Login() {
  const user = await getCurrentUser()

  if (user) {
    redirect("/profile")
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 p-10">
      <div className="flex flex-col gap-4">
        <p className="mb-8 text-center font-medium opacity-80">
          Hey there! Sign in and enjoy <strong>Bookmarkxyz</strong>!
        </p>
        <SignIn />
      </div>
    </div>
  )
}
