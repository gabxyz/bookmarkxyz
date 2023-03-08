import { Loader, User } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-col gap-10 p-10">
      <h2 className="flex items-center gap-2 border-b border-gray-6 pb-4 text-xl font-semibold">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-8 bg-gray-4 text-gray-11">
          <User size={16} />
        </div>
        <p>Log in</p>
      </h2>
      <div className="mt-20 flex justify-center">
        <Loader size={24} className="animate-spin" />
      </div>
    </div>
  )
}
