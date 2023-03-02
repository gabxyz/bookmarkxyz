import { User } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string
    }
  }
  interface User extends User {
    username: string
  }
}
