"use client"
import { FolderHeart, Rocket, Scroll, User } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

import Avatar from "./avatar"
import Tooltip from "./tooltip"

const Sidebar = () => {
  const { data: session } = useSession()
  return (
    <div className="sticky left-0 min-h-screen w-16 border-r border-gray-6 bg-gray-3">
      <div className="flex h-full flex-col items-center justify-between pb-6 pt-4 text-gray-11">
        <Link
          href="/"
          className="text-gray-12 hover:opacity-80 motion-safe:duration-150 motion-safe:ease-productive-standard"
        >
          <FolderHeart size={28} />
        </Link>
        <div className="flex flex-col items-center space-y-8">
          <Tooltip content="Explore" side="right">
            <Link
              href="/explore"
              className="hover:text-gray-12 hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard"
            >
              <Rocket size={20} />
            </Link>
          </Tooltip>
          <Tooltip content="My Lists" side="right">
            <Link
              href="/lists"
              className="hover:text-gray-12 hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard"
            >
              <Scroll size={20} />
            </Link>
          </Tooltip>
          {session?.user ? (
            <Tooltip content={`${session.user.name}'s Profile`} side="right">
              <Link
                href="/profile"
                className="hover:text-gray-12 hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard"
              >
                <Avatar
                  name={session.user.name!}
                  imageUrl={session.user.image!}
                />
              </Link>
            </Tooltip>
          ) : (
            <Tooltip content="Sign In" side="right">
              <Link
                href="/login"
                className="hover:text-gray-12 hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard"
              >
                <User size={20} />
              </Link>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  )
}
export default Sidebar
