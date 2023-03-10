"use client"

import { Prisma, User } from "@prisma/client"
import clsx from "clsx"
import { ArrowUpRight, Loader2, Pencil, Trash, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"

import Avatar from "@/components/avatar"
import CopyButton from "@/components/copy-button"
import HoverCard from "@/components/hover-card"
import Modal from "@/components/modal"
import ProfileCard from "@/components/profile-card"

type ListProps = Prisma.BookmarkListGetPayload<{
  select: {
    listName: true
    listDescription: true
    bookmarks: true
    id: true
  }
}>
type ListCardProps = {
  list: ListProps
  author: Omit<User, "emailVerified" | "email">
}

const ListCard = ({ list, author }: ListCardProps) => {
  const router = useRouter()

  const { data: session } = useSession()
  const isAuthor = session?.user.id === author.id

  const [modalOpen, setModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const body = { bookmarkListId: list.id }
      await fetch("/api/lists/delete-list", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      setModalOpen(!modalOpen)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
    setIsDeleting(false)
  }

  return (
    <div className="flex h-fit w-full flex-col gap-4 overflow-hidden rounded-md border border-gray-6 bg-gray-3 px-6 py-4 text-[15px] shadow-md">
      <div className="-mx-px flex justify-between">
        <div className="-my-1 flex w-full flex-col items-start">
          <h2 className="text-lg font-semibold">{list.listName}</h2>
          <p className="text-sm font-medium opacity-80">
            {list.listDescription}
          </p>
          <p className="mt-1 text-[13px] text-gray-11">by {author.name}</p>
        </div>
        <div className="flex flex-col items-end justify-between">
          <HoverCard
            trigger={
              <Link
                href={`/profile/${author.username}`}
                className="hover:text-gray-12 hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard"
              >
                <Avatar name={author.name!} imageUrl={author.image!} />
              </Link>
            }
          >
            <ProfileCard {...author} />
          </HoverCard>

          {isAuthor && (
            <div className="flex items-center justify-end gap-2">
              <Link
                href={`/edit-list/${list.id}`}
                className="text-gray-11 hover:text-gray-12 motion-safe:duration-200 motion-safe:ease-productive-standard"
              >
                <Pencil size={16} />
              </Link>
              <Modal
                triggerIcon={<Trash size={16} />}
                closeIcon={<X size={18} />}
                isOpen={modalOpen}
                onOpenChange={setModalOpen}
              >
                <div className="p-4 font-medium">
                  <p className="text-center opacity-80">
                    Are you sure you want to delete{" "}
                    <strong>{list.listName}</strong> list?
                  </p>
                  <div className="mt-4 flex gap-4">
                    <button
                      disabled={isDeleting}
                      onClick={() => setModalOpen(false)}
                      className="inline-flex w-full items-center justify-center rounded-lg border border-gray-7 bg-gray-4 py-2 text-sm font-medium text-gray-12 shadow-md hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:duration-150 motion-safe:ease-productive-standard"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isDeleting}
                      onClick={handleDelete}
                      className="inline-flex w-full items-center justify-center rounded-lg border border-red-7 bg-gray-4 py-2 text-sm font-medium text-red-11 shadow-md hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:duration-150 motion-safe:ease-productive-standard"
                    >
                      {isDeleting ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <p>Yes, i'm sure</p>
                      )}
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {list.bookmarks?.map((bookmark) => (
          <div
            key={bookmark.id}
            className="flex items-center justify-between gap-4 border-b border-gray-6 pb-4 last:border-0"
          >
            <a
              className={clsx(
                "group inline-flex w-fit items-center justify-start truncate text-sm font-medium",
                "underline decoration-gray-11 decoration-from-font underline-offset-auto",
                "hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard",
              )}
              aria-label={bookmark.title}
              target="_blank"
              rel="noopener noreferrer"
              href={bookmark.url}
            >
              <p className="mr-1 truncate">{bookmark.title}</p>
              <ArrowUpRight
                size={16}
                className="flex-none text-gray-11 group-hover:rotate-45 motion-safe:duration-200 motion-safe:ease-productive-standard"
              />
            </a>
            <div className="flex w-1/2 items-center justify-end gap-2">
              <p className="truncate pr-px text-[13px] italic text-gray-11">
                {bookmark.url}
              </p>
              <CopyButton url={bookmark.url} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListCard
