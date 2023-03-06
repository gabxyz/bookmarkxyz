import { User } from "@prisma/client"
import { Plus, Scroll } from "lucide-react"
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
    <div className="flex h-full w-full flex-col gap-4 p-10">
      <div className="flex items-end justify-between gap-2 border-b border-gray-6 pb-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Scroll size={20} />
          My Lists
        </h2>
        <Link
          href="/lists/create-list"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-gray-5 px-4 py-2 text-sm font-medium text-slate-12 shadow-md hover:opacity-80 motion-safe:duration-150 motion-safe:ease-productive-standard"
        >
          Create a new list
          <Plus size={16} />
        </Link>
      </div>
      <div className="columns-2xs space-y-4 lg:columns-sm xl:columns-md">
        {lists.map((list) => (
          <ListCard
            key={list.id}
            list={{
              listName: list.listName,
              listDescription: list.listDescription,
              id: list.id,
              bookmarks: list.bookmarks,
            }}
            author={{
              id: list.author.id,
              name: list.author.name,
              username: list.author.username,
              bio: list.author.bio,
              image: list.author.image,
              twitterURL: list.author.twitterURL,
              githubURL: list.author.githubURL,
            }}
          />
        ))}
      </div>
    </div>
  )
}
