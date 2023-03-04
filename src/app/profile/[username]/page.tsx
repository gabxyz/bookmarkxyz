import { User } from "@prisma/client"
import { notFound } from "next/navigation"

import Avatar from "@/components/avatar"
import BackButton from "@/components/back-button"
import ListCard from "@/components/list-card"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

async function getUserData(username: User["username"]) {
  return await db.user.findUnique({
    where: {
      username: username!,
    },
    select: {
      name: true,
      username: true,
      bio: true,
      image: true,
      bookmarkLists: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
              username: true,
              bio: true,
            },
          },
          bookmarks: true,
        },
      },
    },
  })
}

interface UserListsProps {
  params: { username: string }
}

export default async function UserLists({ params }: UserListsProps) {
  const userData = await getUserData(params.username)

  if (!userData) {
    notFound()
  }
  const lists = userData.bookmarkLists

  return (
    <div className="flex h-full flex-col gap-4 p-10">
      <BackButton />
      <div className="flex flex-col gap-4">
        <div className="flex gap-2.5 border-b border-gray-6 py-4">
          <Avatar name={userData.name!} imageUrl={userData.image!} />
          <div className="flex w-2/5 flex-col break-words">
            <h2 className="text-lg font-semibold leading-none">
              {userData.name}
            </h2>
            <p className="text-[13px] text-gray-11">@{userData.username}</p>
            <p className="mt-2 text-[13px] opacity-80">{userData.bio}</p>
          </div>
        </div>
        <div className="columns-md space-y-4 lg:columns-sm">
          {lists.map((list) => (
            <ListCard key={list.id} {...list} />
          ))}
        </div>
      </div>
    </div>
  )
}
