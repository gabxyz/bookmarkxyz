"use client"

import { User } from "@prisma/client"
import clsx from "clsx"
import { ArrowRight, Github, Twitter } from "lucide-react"
import Link from "next/link"

import Avatar from "@/components/avatar"
type ProfileCardProps = Pick<
  User,
  "username" | "name" | "bio" | "image" | "twitterURL" | "githubURL"
>

const ProfileCard = ({
  name,
  username,
  bio,
  image,
  twitterURL,
  githubURL,
}: ProfileCardProps) => {
  return (
    <div className="flex w-full gap-2.5">
      <Avatar name={name!} imageUrl={image!} />
      <div className="flex w-full flex-col">
        <div className="flex w-[310px] justify-between">
          <div className="flex flex-col break-words">
            <h2 className="text-[15px] font-semibold leading-none">{name}</h2>
            <p className="text-[13px] text-gray-11">@{username}</p>
            <p className="mt-2 text-[13px] opacity-80">{bio}</p>
          </div>
          <div className="flex items-start gap-2">
            {twitterURL && (
              <a
                className={clsx(
                  "cursor-pointer text-gray-11",
                  "hover:text-gray-12 hover:opacity-80",
                  "motion-safe:duration-200 motion-safe:ease-productive-standard",
                )}
                aria-label="twitter profile"
                target="_blank"
                rel="noopener noreferrer"
                href={twitterURL}
              >
                <Twitter size={16} />
              </a>
            )}
            {githubURL && (
              <a
                className={clsx(
                  "cursor-pointer text-gray-11",
                  "hover:text-gray-12 hover:opacity-80",
                  "motion-safe:duration-200 motion-safe:ease-productive-standard",
                )}
                aria-label="github profile"
                target="_blank"
                rel="noopener noreferrer"
                href={githubURL}
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
        <div className="mt-4 self-end">
          <Link
            href={`/profile/${username}`}
            className="group inline-flex items-center gap-1 text-[13px] text-gray-12 underline decoration-gray-11 decoration-dashed underline-offset-auto opacity-80 hover:opacity-60 motion-safe:duration-200 motion-safe:ease-productive-standard"
          >
            {username}'s profile
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 motion-safe:duration-200 motion-safe:ease-productive-standard"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
