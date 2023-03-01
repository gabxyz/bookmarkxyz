"use client"

import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { User } from "lucide-react"
interface AvatarProps {
  name: string
  imageUrl: string
}

const Avatar = ({ name, imageUrl }: AvatarProps) => (
  <AvatarPrimitive.Root className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
    <AvatarPrimitive.Image
      className="aspect-square h-full w-full"
      src={imageUrl}
      alt={name}
    />
    <AvatarPrimitive.Fallback
      className="flex h-full w-full items-center justify-center rounded-full border border-gray-7 text-gray-11"
      delayMs={600}
    >
      <User size={16} />
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
)

export default Avatar
