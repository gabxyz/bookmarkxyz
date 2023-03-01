import { Bookmark } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

import { db } from "@/lib/db"

import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  console.log(id)
  if (req.method === "GET") {
    return await getBookmarkList(req, res, id as string)
  }

  if (req.method === "PUT") {
    return await updateBookmarkList(req, res, id as string)
  }

  if (req.method === "DELETE") {
    return await deleteBookmarkList(req, res, id as string)
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
        authorId: session.user.id,
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
        authorId: session.user.id,
      },
      include: {
        bookmarks: true,
      },
    })

    if (!bookmarkList) {
      return res.status(404).end()
    }

    // Get the IDs of the bookmarks in the request
    const requestBookmarkIds = bookmarks.map(
      (bookmark: Bookmark) => bookmark.id,
    )

    // Get the IDs of the bookmarks in the existing bookmark list
    const existingBookmarkIds = bookmarkList.bookmarks.map(
      (bookmark) => bookmark.id,
    )

    // Find the IDs of the bookmarks that are in the existing bookmark list but not in the request
    const removedBookmarkIds = existingBookmarkIds.filter(
      (id) => !requestBookmarkIds.includes(id),
    )

    // Remove the bookmarks with the removed IDs
    await db.bookmark.deleteMany({
      where: {
        id: { in: removedBookmarkIds },
      },
    })

    const updatedBookmarkList = await db.bookmarkList.update({
      where: { id: bookmarkListId },
      data: {
        listName,
        listDescription,
        bookmarks: {
          upsert: bookmarks.map((bookmark: Bookmark) => ({
            where: {
              id: bookmark.id || bookmarkList.id,
            },
            update: {
              title: bookmark.title,
              url: bookmark.url,
            },
            create: {
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
        authorId: session.user.id,
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
