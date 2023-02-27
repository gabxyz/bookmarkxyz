import { redirect } from "next/navigation"

import ListForm from "@/components/list-form"
import { getCurrentUser } from "@/lib/session"

export default async function CreateList() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <ListForm type="create" />
    </main>
  )
}
