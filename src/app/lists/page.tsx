import { User } from "@prisma/client"
import { Plus } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

import ListCard from "@/components/list-card"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export const dynamic = "force-dynamic"

async function getUserLists(userId: User["id"]) {
  return await db.bookmarkList.findMany({
    where: {
      authorId: userId,
    },
    include: {
      bookmarks: true,
      author: true,
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
    <div className="flex h-full flex-col gap-4 p-10">
      <Link
        href="/lists/create-list"
        className="inline-flex w-fit items-center gap-2 rounded-lg bg-gray-5 px-4 py-2 text-sm font-medium text-slate-12 shadow-md hover:opacity-80 motion-safe:duration-150 motion-safe:ease-productive-standard"
      >
        Create a new list
        <Plus size={16} />
      </Link>
      <div className="columns-md space-y-4 lg:columns-sm">
        {lists.map((list) => (
          <ListCard key={list.id} {...list} />
        ))}
      </div>
    </div>
  )
}
