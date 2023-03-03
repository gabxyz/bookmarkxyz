import { Bookmark } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

import { db } from "@/lib/db"

import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      return res.status(401).end()
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
            })),
          },
          authorId: session.user.id,
        },
        include: {
          bookmarks: true,
        },
      })
      return res.json(newBoomarkList)
    } catch (error) {
      return res.status(422).json({ error: "Unable to create list" })
    }
  }
}
