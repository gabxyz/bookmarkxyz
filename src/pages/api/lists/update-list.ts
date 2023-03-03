import { Bookmark } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

import { db } from "@/lib/db"

import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      return res.status(401).end()
    }

    const { listName, listDescription, bookmarks, bookmarkListId } = req.body

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
      return res.status(422).json({ error: "Unable to update list" })
    }
  }
}
