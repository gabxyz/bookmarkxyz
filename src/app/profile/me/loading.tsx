import { Loader, User } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-col gap-10 p-10">
      <div className="flex items-end justify-between gap-2 border-b border-gray-6 pb-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-8 bg-gray-4 text-gray-11">
            <User size={16} />
          </div>
          <p>Me</p>
        </h2>
        <button className="inline-flex w-fit items-center justify-center rounded-lg border border-red-6 bg-gray-4 py-1.5 px-6 text-sm font-medium text-red-11 shadow-md">
          Sign out
        </button>
      </div>
      <div className="mt-20 flex justify-center">
        <Loader size={24} className="animate-spin" />
      </div>
    </div>
  )
}
