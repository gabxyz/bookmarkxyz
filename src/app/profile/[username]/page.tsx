import { User } from "@prisma/client"
import clsx from "clsx"
import { Github, Twitter } from "lucide-react"
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
      twitterURL: true,
      githubURL: true,
      bookmarkLists: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
              username: true,
              bio: true,
              twitterURL: true,
              githubURL: true,
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
    <div className="flex h-full w-full flex-col gap-4 p-10">
      <BackButton />
      <div className="flex flex-col gap-4">
        <div className="flex gap-2.5 py-4">
          <Avatar name={userData.name!} imageUrl={userData.image!} />
          <div className="flex justify-between gap-8">
            <div className="flex flex-col break-words">
              <h2 className="text-lg font-semibold leading-none">
                {userData.name}
              </h2>
              <p className="text-[13px] text-gray-11">@{userData.username}</p>
              <p className="ml-px mt-2 text-[13px] opacity-80">
                {userData.bio}
              </p>
            </div>
            <div className="flex items-start gap-2">
              {userData.twitterURL && (
                <a
                  className={clsx(
                    "cursor-pointer text-gray-11",
                    "hover:text-gray-12 hover:opacity-80",
                    "motion-safe:duration-200 motion-safe:ease-productive-standard",
                  )}
                  aria-label="twitter profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={userData.twitterURL}
                >
                  <Twitter size={16} />
                </a>
              )}
              {userData.githubURL && (
                <a
                  className={clsx(
                    "cursor-pointer text-gray-11",
                    "hover:text-gray-12 hover:opacity-80",
                    "motion-safe:duration-200 motion-safe:ease-productive-standard",
                  )}
                  aria-label="github profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={userData.githubURL}
                >
                  <Github size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="columns-2xs space-y-4 lg:columns-sm xl:columns-md">
          {lists.map((list) => (
            <ListCard key={list.id} {...list} />
          ))}
        </div>
      </div>
    </div>
  )
}
