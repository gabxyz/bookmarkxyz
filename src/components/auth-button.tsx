"use client"

import clsx from "clsx"
import { Github } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { signIn, signOut } from "next-auth/react"

export const SignIn = () => {
  const searchParams = useSearchParams()
  const handleSignIn = (provider: string) => {
    signIn(provider, {
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/profile/me",
    })
  }

  return (
    <>
      <button
        onClick={() => handleSignIn("github")}
        className={clsx(
          "flex w-full max-w-sm items-center justify-center gap-2 py-2 px-4 text-sm",
          "rounded-lg border border-gray-7 bg-gray-4 font-medium shadow-md",
          "hover:opacity-80 motion-safe:duration-150 motion-safe:ease-productive-standard",
        )}
      >
        <Github size={18} />
        <span>
          Continue with <strong>Github</strong>
        </span>
      </button>
      <button
        onClick={() => handleSignIn("google")}
        className={clsx(
          "flex w-full max-w-sm items-center justify-center gap-2 py-2 px-4 text-sm",
          "rounded-lg border border-gray-7 bg-gray-4 font-medium shadow-md",
          "hover:opacity-80 motion-safe:duration-150 motion-safe:ease-productive-standard",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18"
          viewBox="0 0 24 24"
          width="18"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
        <span>
          Continue with <strong>Google</strong>
        </span>
      </button>
    </>
  )
}

export const SignOut = () => {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
      className="inline-flex w-fit items-center justify-center rounded-lg border border-red-6 bg-gray-4 py-1.5 px-6 text-sm font-medium text-red-11 shadow-md hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:duration-150 motion-safe:ease-productive-standard"
    >
      Sign out
    </button>
  )
}
