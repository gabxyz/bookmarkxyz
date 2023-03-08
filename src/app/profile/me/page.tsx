import { User } from "@prisma/client"
import { redirect } from "next/navigation"

import { SignOut } from "@/components/auth-button"
import Avatar from "@/components/avatar"
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
    <div className="flex h-full w-full flex-col gap-4 p-10">
      <div className="flex items-end justify-between gap-2 border-b border-gray-6 pb-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Avatar name={userData?.name!} imageUrl={userData?.image!} />
          <p>Me</p>
        </h2>
        <SignOut />
      </div>
      <div className="flex flex-col items-center justify-center md:mt-10">
        <ProfileForm {...userData!} />
      </div>
    </div>
  )
}
