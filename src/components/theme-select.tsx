"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronDown, Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import type { ReactElement } from "react"
import { useEffect, useState } from "react"

const ThemeSelect = () => {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const themes: { value: string; icon: ReactElement }[] = [
    { value: "system", icon: <Monitor size={16} /> },
    { value: "dark", icon: <Moon size={16} /> },
    { value: "light", icon: <Sun size={16} /> },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-7 w-[49px] rounded-lg border border-gray-7 bg-gray-4"></div>
    )
  }

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger
        aria-label="Trigger for the website color theme selection menu"
        className={clsx(
          "flex h-7 items-center gap-1 px-1.5 text-sm font-medium",
          "rounded-lg border border-gray-7 bg-gray-4 text-gray-11",
          "hover:border-gray-8 hover:bg-gray-5 hover:text-gray-12 hover:opacity-80",
          "motion-safe:duration-150 motion-safe:ease-productive-standard",
        )}
      >
        {themes.find((themeCurr) => themeCurr.value === theme)?.icon}
        {<ChevronDown size={15} />}
      </DropdownMenu.Trigger>
      <AnimatePresence>
        {open && (
          <DropdownMenu.Portal forceMount>
            <DropdownMenu.Content
              onCloseAutoFocus={(e) => e.preventDefault()}
              asChild
              sideOffset={6}
              align="center"
              className="z-30"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <DropdownMenu.RadioGroup
                  value={theme}
                  onValueChange={setTheme}
                  className="divide-y divide-gray-6 overflow-hidden rounded-lg border border-gray-7 bg-gray-3 shadow"
                >
                  {themes.map(({ value, icon }) => (
                    <DropdownMenu.RadioItem
                      key={value}
                      aria-label={`${value} color scheme`}
                      value={value}
                      className={clsx(
                        "group flex h-7 w-28 items-center justify-between gap-1 px-2 text-sm font-medium",
                        "select-none outline-none hover:bg-gray-6",
                        "motion-safe:duration-150 motion-safe:ease-productive-standard",
                      )}
                    >
                      <div className="flex items-center gap-1 group-active:scale-90 motion-safe:duration-75 motion-safe:ease-productive-standard">
                        {icon}
                        {value}
                      </div>

                      <DropdownMenu.ItemIndicator>
                        <Check size={14} />
                      </DropdownMenu.ItemIndicator>
                    </DropdownMenu.RadioItem>
                  ))}
                </DropdownMenu.RadioGroup>
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  )
}

export default ThemeSelect
