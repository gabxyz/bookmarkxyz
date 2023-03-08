import { Plus } from "lucide-react"

import BackButton from "@/components/back-button"

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-col gap-10 p-10">
      <BackButton />
      <div className="pointer-events-none flex animate-[pulse_1.2s_ease-in-out_infinite] flex-col items-center justify-center">
        <div className="flex h-fit w-full max-w-lg flex-col gap-4 rounded-md border border-gray-6 bg-gray-3 px-8 py-4 text-[15px] shadow-md">
          <div className="flex w-full flex-col items-start">
            <div className="mb-2 font-medium opacity-75">List Name</div>
            <div className="-mx-px block w-full rounded-md bg-gray-6 px-2 py-1.5">
              <div className="h-[22.5px]" />
            </div>
          </div>
          <div className="flex w-full flex-col items-start">
            <div className="mb-2 font-medium opacity-75">List Description</div>
            <div className="-mx-px block w-full rounded-md bg-gray-6 px-2 py-1.5">
              <div className="h-[22.5px]" />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3">
            <div className="my-4 flex flex-col items-start">
              <div className="flex w-full items-center justify-between">
                <div className="font-medium opacity-75">Bookmarks</div>
                <Plus size={20} />
              </div>
            </div>
          </div>
          <button className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-gray-5 py-2 text-sm font-medium text-gray-12 opacity-50 shadow-md">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
