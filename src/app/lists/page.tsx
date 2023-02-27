import { User } from "@prisma/client"
import Link from "next/link"
import { redirect } from "next/navigation"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export const dynamic = "force-dynamic"

async function getUserLists(userId: User["id"]) {
  return await db.bookmarkList.findMany({
    where: {
      userId,
    },
    include: {
      bookmarks: true,
    },
  })
}

export default async function Lists() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const lists = await getUserLists(user.id)

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <Link href="/lists/create-list">Create</Link>
      {lists.map((list) => (
        <Link key={list.id} href={`/lists/edit-list/${list.id}`}>
          Edit {list.listName}
        </Link>
      ))}
    </main>
  )
}
