import { Rocket } from "lucide-react"

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
    <div className="flex h-full w-full flex-col gap-4 p-10">
      <h2 className="flex items-center gap-2 border-b border-gray-6 pt-2 pb-4 text-xl font-semibold">
        <Rocket size={20} />
        Explore
      </h2>
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
