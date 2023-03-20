"use client"

import { FolderHeart, Rocket, Scroll, User as UserIcon } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

import Avatar from "@/components/avatar"
import Tooltip from "@/components/tooltip"

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <div className="fixed z-20 h-14 w-full border-b border-gray-6 bg-gray-3 md:h-full md:w-16 md:border-r">
      <div className="flex h-full items-center justify-between px-6 text-gray-11 md:flex-col md:py-6">
        <Link
          href="/"
          className="text-gray-12 hover:opacity-80 motion-safe:duration-150 motion-safe:ease-productive-standard"
        >
          <FolderHeart size={28} />
        </Link>
        <div className="flex items-center gap-8 md:flex-col">
          <Tooltip content="Explore">
            <Link
              href="/explore"
              className="hover:text-gray-12 hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard"
            >
              <Rocket size={20} />
            </Link>
          </Tooltip>
          <Tooltip content="My Lists">
            <Link
              href="/my-lists"
              className="hover:text-gray-12 hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard"
            >
              <Scroll size={20} />
            </Link>
          </Tooltip>
          {session?.user ? (
            <Tooltip content={`${session.user.name}'s Profile`}>
              <Link
                href="/profile/me"
                className="hover:text-gray-12 hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard"
              >
                <Avatar
                  name={session.user.name!}
                  imageUrl={session.user.image!}
                />
              </Link>
            </Tooltip>
          ) : (
            <Tooltip content="Log in">
              <Link
                href="/login"
                className="hover:text-gray-12 hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard"
              >
                <UserIcon size={20} />
              </Link>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  )
}
export default Navbar
