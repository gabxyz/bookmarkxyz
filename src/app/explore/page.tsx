import ListCard from "@/components/list-card"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

async function getLists() {
  return await db.bookmarkList.findMany({
    take: 10,
    orderBy: { createdAt: "asc" },
    include: {
      bookmarks: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          bio: true,
          username: true,
          twitterURL: true,
          githubURL: true,
        },
      },
    },
  })
}

export default async function Explore() {
  const lists = await getLists()

  return (
    <div className="flex h-full w-full flex-col gap-10 p-10">
      <h2 className="text-xl font-semibold">Explore Lists</h2>
      <div className="columns-2xs space-y-4 lg:columns-sm xl:columns-md">
        {lists.map((list) => (
          <ListCard key={list.id} {...list} />
        ))}
      </div>
    </div>
  )
}
