"use client"

import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"

interface CopyButtonProps {
  url: string
}

const CopyButton = ({ url }: CopyButtonProps) => {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 1500)
  }, [hasCopied])

  return (
    <button
      disabled={hasCopied}
      onClick={async () => {
        await navigator.clipboard.writeText(url)
        setHasCopied(true)
      }}
      className="h-fit w-fit text-center font-medium text-slate-12 hover:opacity-80 disabled:pointer-events-none disabled:text-green-9 motion-safe:duration-150 motion-safe:ease-productive-standard"
    >
      {hasCopied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  )
}
export default CopyButton
