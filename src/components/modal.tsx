"use client"

import * as Dialog from "@radix-ui/react-dialog"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"

interface ModalProps {
  triggerIcon: React.ReactElement
  closeIcon: React.ReactElement
  children: React.ReactNode
  isOpen: boolean
  onOpenChange?: (isOpen: boolean) => void
}

const Modal = ({
  triggerIcon,
  closeIcon,
  children,
  isOpen,
  onOpenChange,
}: ModalProps) => {
  return (
    <Dialog.Root modal open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger
        className={clsx(
          "h-fit w-fit overflow-hidden text-gray-11 hover:text-gray-12",
          "motion-safe:duration-200 motion-safe:ease-productive-standard",
        )}
      >
        {triggerIcon}
      </Dialog.Trigger>
      <AnimatePresence mode="wait">
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 350,
                }}
                className="fixed inset-0 flex cursor-pointer flex-col overflow-y-auto bg-blackA-9 backdrop-blur-[1px]"
              >
                <Dialog.Content asChild forceMount>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      type: "spring",
                      damping: 25,
                      stiffness: 350,
                    }}
                    className="relative mt-10 flex max-w-lg cursor-auto flex-col gap-4 self-center rounded-lg border border-gray-6 bg-gray-3 px-8 py-4 text-[15px] shadow"
                  >
                    {children}
                    <Dialog.Close className="absolute top-2 right-2 text-gray-11 hover:text-gray-12 motion-safe:duration-200 motion-safe:ease-productive-standard">
                      {closeIcon}
                    </Dialog.Close>
                  </motion.div>
                </Dialog.Content>
              </motion.div>
            </Dialog.Overlay>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

export default Modal
