import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      membershipType: string
      membershipStatus: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: string
    membershipType: string
    membershipStatus: string
  }
}
