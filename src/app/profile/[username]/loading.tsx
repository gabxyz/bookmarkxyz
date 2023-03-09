import { Loader, User } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-col gap-10 p-10">
      <div className="flex w-full justify-center gap-4 border-b border-gray-6 px-4 pt-2 pb-4 md:justify-start">
        <div className="flex h-14 w-14 shrink-0 animate-[pulse_1.2s_ease-in-out_infinite] items-center justify-center rounded-full border border-gray-8 bg-gray-4 text-gray-11">
          <User size={22} />
        </div>
        <div className="flex max-h-[65px] w-full max-w-md animate-[pulse_1.2s_ease-in-out_infinite] flex-col gap-1">
          <div className="h-5 w-3/4 rounded-lg bg-gray-4" />
          <div className="h-4 w-1/3 rounded-lg bg-gray-4" />
          <div className="mt-2 h-4 w-3/4 rounded-lg bg-gray-4" />
        </div>
      </div>
      <div className="mt-20 flex justify-center">
        <Loader size={24} className="animate-spin" />
      </div>
    </div>
  )
}
