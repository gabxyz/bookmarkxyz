"use client"

import { Prisma } from "@prisma/client"
import clsx from "clsx"
import { ArrowUpRight, Pencil, Trash, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"

import Avatar from "./avatar"
import CopyButton from "./copy-button"
import Modal from "./modal"

type ListCardProps = Prisma.BookmarkListGetPayload<{
  include: {
    bookmarks: true
    author: true
  }
}>

const ListCard = ({
  listName,
  listDescription,
  bookmarks,
  author,
  id,
}: ListCardProps) => {
  const router = useRouter()
  const { data } = useSession()
  const isAuthor = data?.user.id === author.id
  const [modalOpen, setModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await fetch(`/api/bookmarkLists/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
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
        <div className="flex w-full flex-col items-start">
          <h2 className="text-lg font-semibold">{listName}</h2>
          <p className="text-sm font-medium opacity-80">{listDescription}</p>
          <p className="mt-1 text-[13px] text-gray-11">by {author.name}</p>
        </div>
        <div className="flex flex-col items-end justify-between">
          <Avatar name={author.name!} imageUrl={author.image!} />
          {isAuthor && (
            <div className="mb-1 flex items-center justify-end gap-2">
              <Link
                href={`/lists/edit-list/${id}`}
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
                    <span className="font-bold">{listName}</span> list?{" "}
                  </p>
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="w-full rounded-lg bg-gray-5 py-2 text-center text-sm font-medium text-gray-12 shadow-md hover:opacity-80 motion-safe:duration-150 motion-safe:ease-productive-standard"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isDeleting}
                      onClick={handleDelete}
                      className="w-full rounded-lg bg-red-9 py-2 text-center text-sm font-medium text-gray-1 opacity-90 shadow-md hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:duration-150 motion-safe:ease-productive-standard"
                    >
                      Yes, i'm sure
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {bookmarks?.map((bookmark) => (
          <div
            key={bookmark.id}
            className="flex items-center justify-between gap-2 border-b border-gray-6 pb-3 last:border-0"
          >
            <a
              className={clsx(
                "group inline-flex w-1/2 items-center justify-start gap-px truncate text-sm font-medium",
                "underline decoration-gray-11 decoration-from-font underline-offset-4",
                "hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard",
              )}
              aria-label={bookmark.title}
              target="_blank"
              rel="noopener noreferrer"
              href={bookmark.url}
            >
              <p className="truncate">{bookmark.title}</p>
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
