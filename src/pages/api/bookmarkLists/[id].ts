import { Bookmark } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

import { db } from "@/lib/db"

import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { bookmarkListId } = req.query

  if (req.method === "GET") {
    return await getBookmarkList(req, res, bookmarkListId as string)
  }

  if (req.method === "PUT") {
    return await updateBookmarkList(req, res, bookmarkListId as string)
  }

  if (req.method === "DELETE") {
    return await deleteBookmarkList(req, res, bookmarkListId as string)
  }

  return res.status(404).end()
}

async function getBookmarkList(
  req: NextApiRequest,
  res: NextApiResponse,
  bookmarkListId: string,
) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(403).end()
  }

  try {
    const bookmarkList = await db.bookmarkList.findFirst({
      where: {
        id: bookmarkListId,
        userId: session.user.id,
      },
      include: {
        bookmarks: true,
      },
    })

    if (!bookmarkList) {
      return res.status(404).end()
    }

    return res.json(bookmarkList)
  } catch (error) {
    return res.status(500).end()
  }
}

async function updateBookmarkList(
  req: NextApiRequest,
  res: NextApiResponse,
  bookmarkListId: string,
) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(403).end()
  }

  const { listName, listDescription, bookmarks } = req.body

  try {
    const bookmarkList = await db.bookmarkList.findFirst({
      where: {
        id: bookmarkListId,
        userId: session.user.id,
      },
    })

    if (!bookmarkList) {
      return res.status(404).end()
    }

    const updatedBookmarkList = await db.bookmarkList.update({
      where: { id: bookmarkListId },
      data: {
        listName,
        listDescription,
        bookmarks: {
          updateMany: bookmarks.map((bookmark: Bookmark) => ({
            where: {
              id: bookmark.id,
            },
            data: {
              title: bookmark.title,
              url: bookmark.url,
            },
          })),
        },
      },
      include: {
        bookmarks: true,
      },
    })

    return res.json(updatedBookmarkList)
  } catch (error) {
    return res.status(422).json({ error: "unable to update list" })
  }
}

async function deleteBookmarkList(
  req: NextApiRequest,
  res: NextApiResponse,
  bookmarkListId: string,
) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(403).end()
  }

  try {
    const bookmarkList = await db.bookmarkList.findFirst({
      where: {
        id: bookmarkListId,
        userId: session.user.id,
      },
    })

    if (!bookmarkList) {
      return res.status(404).end()
    }

    await db.bookmarkList.delete({
      where: {
        id: bookmarkListId,
      },
    })

    return res.status(204).end()
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}
