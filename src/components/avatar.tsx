"use client"

import * as AvatarPrimitive from "@radix-ui/react-avatar"
interface AvatarProps {
  name: string
  imageUrl: string
}

const Avatar = ({ name, imageUrl }: AvatarProps) => (
  <AvatarPrimitive.Root className="inline-flex h-7 w-7 select-none items-center justify-center overflow-hidden rounded-full bg-blackA-3 align-middle">
    <AvatarPrimitive.Image
      className="h-full w-full rounded-[inherit] object-cover"
      src={imageUrl}
      alt={name}
    />
    <AvatarPrimitive.Fallback
      className="leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium text-gray-11"
      delayMs={600}
    >
      CT
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
)

export default Avatar
