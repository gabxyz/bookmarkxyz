"use client"

import * as AvatarPrimitive from "@radix-ui/react-avatar"
import clsx from "clsx"
import { User } from "lucide-react"
interface AvatarProps {
  name: string
  imageUrl: string
  size?: "normal" | "lg"
}

const Avatar = ({ name, imageUrl, size = "normal" }: AvatarProps) => (
  <AvatarPrimitive.Root
    className={clsx(
      size === "normal" && "h-8 w-8",
      size === "lg" && "h-14 w-14",
      "relative flex shrink-0 overflow-hidden rounded-full",
    )}
  >
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
