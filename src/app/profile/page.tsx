import { User } from "@prisma/client"
import { redirect } from "next/navigation"

import { SignOut } from "@/components/auth-button"
import ProfileForm from "@/components/profile-form"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

async function getUser(userId: User["id"]) {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
  })
}

export default async function Profile() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const userData = await getUser(user.id)

  return (
    <div className="flex h-full flex-col gap-10 p-10">
      <div className="flex flex-col items-center justify-center gap-8">
        <p className="text-center font-medium opacity-80">
          Logged in as <strong>{userData?.username}</strong>
        </p>
        <ProfileForm {...userData!} />
        <SignOut />
      </div>
    </div>
  )
}
