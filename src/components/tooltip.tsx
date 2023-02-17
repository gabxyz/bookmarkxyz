"use client"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import clsx from "clsx"
import * as React from "react"

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  align?: TooltipPrimitive.TooltipContentProps["align"]
  side?: TooltipPrimitive.TooltipContentProps["side"]
}

const Tooltip = ({
  children,
  content,
  align = "center",
  side = "bottom",
}: TooltipProps) => {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          align={align}
          sideOffset={14}
          className={clsx(
            "z-20 inline-flex items-center py-1.5 px-2.5",
            "rounded-xl bg-gray-7 text-sm font-medium text-gray-12 shadow",
            "motion-safe:rdx-side-bottom:animate-slide-down-fade motion-safe:rdx-side-top:animate-slide-up-fade",
            "motion-safe:rdx-side-left:animate-slide-left-fade motion-safe:rdx-side-right:animate-slide-right-fade",
          )}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}

export default Tooltip
