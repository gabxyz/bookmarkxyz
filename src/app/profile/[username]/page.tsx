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
    include: {
      bookmarkLists: {
        include: {
          bookmarks: true,
          author: true,
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
      <div className="flex items-start justify-center gap-4 border-b border-gray-6 px-4 pt-2 pb-4 md:justify-start">
        <Avatar name={userData.name!} imageUrl={userData.image!} size="lg" />
        <div className="flex w-full max-w-full flex-col gap-4 md:max-w-[288px] lg:max-w-sm xl:max-w-md">
          <div className="flex flex-col break-words">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold leading-none">
                {userData.name}
              </h2>
              <div className="flex items-center gap-2">
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
            <p className="text-[13px] text-gray-11">@{userData.username}</p>
            <p className="ml-px mt-2 text-[13px] opacity-80">{userData.bio}</p>
          </div>
        </div>
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
