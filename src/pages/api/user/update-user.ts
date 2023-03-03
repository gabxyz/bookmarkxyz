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

    const { username, bio } = req.body

    try {
      // Check if the new username already exists
      const existingUser = await db.user.findUnique({
        where: { username },
      })

      if (existingUser && existingUser.id !== session.user.id) {
        return res.status(409).json({ error: "Username already exists" })
      }

      // Update the user
      const updatedUser = await db.user.update({
        where: { id: session.user.id },
        data: { username, bio },
      })

      return res.json(updatedUser)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Internal Server Error" })
    }
  }
}

// async function updateUser(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getServerSession(req, res, authOptions)
//   if (!session) {
//     return res.status(403).end()
//   }

//   const { username, bio } = req.body

//   try {
//     const user = await db.user.findUnique({
//       where: {
//         username: session.user.username,
//         id: session.user.id,
//       },
//     })

//     if (!user) {
//       return res.status(404).end()
//     }

//     const updatedUser = await db.user.update({
//       where: { username: session.user.username, id: session.user.id },
//       data: { username, bio },
//     })

//     return res.json(updatedUser)
//   } catch (error) {
//     return res.status(422).json({ error: "unable to update list" })
//   }
// }
