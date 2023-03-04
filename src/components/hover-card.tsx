"use client"

import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import clsx from "clsx"

interface HoverCardProps {
  trigger: React.ReactNode
  children: React.ReactNode
}

const HoverCard = ({ trigger, children }: HoverCardProps) => {
  return (
    <HoverCardPrimitive.Root openDelay={200} closeDelay={150}>
      <HoverCardPrimitive.Trigger>{trigger}</HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          sideOffset={4}
          className={clsx(
            "z-30 m-4 w-[384px] border border-gray-7 p-4",
            "rounded-xl bg-gray-5 text-[13px] text-gray-12 shadow",
            "motion-safe:rdx-side-bottom:animate-slide-down-fade motion-safe:rdx-side-top:animate-slide-up-fade",
            "motion-safe:rdx-side-left:animate-slide-left-fade motion-safe:rdx-side-right:animate-slide-right-fade",
          )}
        >
          {children}
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  )
}

export default HoverCard
