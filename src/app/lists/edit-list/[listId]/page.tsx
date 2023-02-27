import { BookmarkList, User } from "@prisma/client"
import { notFound, redirect } from "next/navigation"

import ListForm from "@/components/list-form"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

async function getList(userId: User["id"], listId: BookmarkList["id"]) {
  return await db.bookmarkList.findFirst({
    where: {
      id: listId,
      userId,
    },
    include: {
      bookmarks: true,
    },
  })
}

interface EditListPageProps {
  params: { listId: string }
}

export default async function EditList({ params }: EditListPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const list = await getList(user.id, params.listId)

  if (!list) {
    notFound()
  }

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <ListForm
        type="update"
        initialData={{
          listName: list.listName,
          listDescription: list.listDescription,
          bookmarks: list.bookmarks,
          listId: list.id,
        }}
      />
    </main>
  )
}
