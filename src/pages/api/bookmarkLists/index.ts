import { Bookmark } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

import { db } from "@/lib/db"

import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    return await getUserBookmarkLists(req, res)
  }
  if (req.method === "POST") {
    return await createBookmarkList(req, res)
  }
}

async function getUserBookmarkLists(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(403).end()
  }
  try {
    const lists = await db.bookmarkList.findMany({
      where: {
        userId: session.user.id,
      },
    })
    return res.json(lists)
  } catch (error) {
    return res.status(500).end()
  }
}

async function createBookmarkList(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(403).end()
  }
  const { listName, listDescription, bookmarks } = req.body
  try {
    const newBoomarkList = await db.bookmarkList.create({
      data: {
        listName,
        listDescription,
        bookmarks: {
          create: bookmarks.map((bookmark: Bookmark) => ({
            url: bookmark.url,
            title: bookmark.title,
            bookmarkListId: bookmark.bookmarkListId,
          })),
        },
        userId: session.user.id,
      },
      include: {
        bookmarks: true,
      },
    })
    return res.json(newBoomarkList)
  } catch (error) {
    return res.status(422).json({ error: "unable to create list" })
  }
}
