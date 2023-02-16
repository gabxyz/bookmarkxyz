"use client"
import { FolderHeart, Rocket, Scroll, User } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

import Avatar from "./avatar"

const Sidebar = () => {
  const { data: session } = useSession()
  return (
    <div className="sticky left-0 min-h-screen w-20 border-r border-gray-6 bg-gray-3">
      <div className="flex h-full flex-col items-center justify-between pb-6 pt-4 text-gray-11">
        <Link
          href="/"
          className="text-gray-12 hover:opacity-80 motion-safe:duration-150 motion-safe:ease-productive-standard"
        >
          <FolderHeart size={28} />
        </Link>
        <ul className="space-y-8">
          <li>
            <Rocket size={20} />
          </li>
          <li>
            <Scroll size={20} />
          </li>
          <li>
            {session?.user ? (
              <Link href="/profile">
                <Avatar
                  name={session.user.name!}
                  imageUrl={session.user.image!}
                />
              </Link>
            ) : (
              <Link href="/login">
                <User size={20} />
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Sidebar
