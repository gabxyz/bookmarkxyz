import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

import { db } from "@/lib/db"

import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      return res.status(401).end()
    }

    const { bookmarkListId } = req.body

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
      return res.status(422).json({ error: "Unable to delete list" })
    }
  }
}
