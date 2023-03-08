import { Loader, Plus, Scroll } from "lucide-react"
import Link from "next/link"

export default function Loading() {
  return (
    <div className="flex h-full flex-col gap-10 p-10">
      <div className="flex items-end justify-between gap-2 border-b border-gray-6 pb-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Scroll size={24} />
          My Lists
        </h2>
        <Link
          href="/lists/create-list"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-gray-5 px-4 py-2 text-sm font-medium text-slate-12 shadow-md hover:opacity-80 motion-safe:duration-150 motion-safe:ease-productive-standard"
        >
          Create new list
          <Plus size={16} />
        </Link>
      </div>
      <div className="mt-20 flex justify-center">
        <Loader size={24} className="animate-spin" />
      </div>
    </div>
  )
}
