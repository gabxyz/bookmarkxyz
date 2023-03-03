import { User } from "@prisma/client"
import { notFound } from "next/navigation"

import BackButton from "@/components/back-button"
import ListCard from "@/components/list-card"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

async function getLists(username: User["username"]) {
  return await db.bookmarkList.findMany({
    where: {
      author: {
        username,
      },
    },
    include: {
      bookmarks: true,
      author: true,
    },
  })
}

interface UserListsProps {
  params: { username: string }
}

export default async function UserLists({ params }: UserListsProps) {
  const lists = await getLists(params.username)

  if (!lists) {
    notFound()
  }

  return (
    <div className="flex h-full flex-col gap-4 p-10">
      <BackButton />
      <div className="columns-md space-y-4 lg:columns-sm">
        {lists.map((list) => (
          <ListCard key={list.id} {...list} />
        ))}
      </div>
    </div>
  )
}
