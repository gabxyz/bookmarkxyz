import { Plus } from "lucide-react"
import Link from "next/link"

import ListCard from "@/components/list-card"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

async function getLists() {
  return await db.bookmarkList.findMany({
    take: 10,
    orderBy: { createdAt: "asc" },
    include: {
      bookmarks: true,
      author: true,
    },
  })
}

export default async function Explore() {
  const lists = await getLists()

  return (
    <div className="flex h-full w-full flex-col gap-10 p-10">
      <h2 className="text-xl font-semibold">Explore Lists</h2>
      <div className="columns-md space-y-4 lg:columns-sm">
        {lists.map((list) => (
          <ListCard key={list.id} {...list} />
        ))}
      </div>
    </div>
  )
}
