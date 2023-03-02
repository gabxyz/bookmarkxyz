import { FolderHeart, Rocket, Scroll, User } from "lucide-react"
import Link from "next/link"

import { getCurrentUser } from "@/lib/session"

import Avatar from "./avatar"
import Tooltip from "./tooltip"

const Navbar = async () => {
  const user = await getCurrentUser()
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
          {user ? (
            <Tooltip content={`${user.name}'s Profile`} side="right">
              <Link
                href="/profile"
                className="hover:text-gray-12 hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard"
              >
                <Avatar name={user.name!} imageUrl={user.image!} />
              </Link>
            </Tooltip>
          ) : (
            <Tooltip content="Sign in" side="right">
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
export default Navbar
