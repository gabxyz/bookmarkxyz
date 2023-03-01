import { redirect } from "next/navigation"

import BackButton from "@/components/back-button"
import ListForm from "@/components/list-form"
import { getCurrentUser } from "@/lib/session"

export default async function CreateList() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex h-full flex-col gap-10 p-10">
      <BackButton />
      <div className="flex flex-col items-center justify-center">
        <ListForm type="create" />
      </div>
    </div>
  )
}
