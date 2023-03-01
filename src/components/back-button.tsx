"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const BackButton = () => {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="text-gray-11 hover:text-gray-12 motion-safe:duration-200 motion-safe:ease-productive-standard"
    >
      <ArrowLeft size={18} />
    </button>
  )
}

export default BackButton
