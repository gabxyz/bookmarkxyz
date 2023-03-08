import { Loader, Rocket } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-col gap-10 p-10">
      <h2 className="flex items-center gap-2 border-b border-gray-6 pt-2 pb-4 text-xl font-semibold">
        <Rocket size={24} />
        Explore
      </h2>
      <div className="mt-20 flex justify-center">
        <Loader size={24} className="animate-spin" />
      </div>
    </div>
  )
}
