import clsx from "clsx"

import ThemeSelect from "@/components/theme-select"

export default function Home() {
  return (
    <main className="mx-2 flex min-h-screen flex-col items-center justify-center gap-8 text-center text-sm md:text-base">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/gabxyz/bookmarkxyz"
        className={clsx(
          "bg-gradient-to-r from-purple-11 to-indigo-11 bg-clip-text text-xl font-bold text-transparent",
          "select-none hover:opacity-80 motion-safe:duration-150 motion-safe:ease-productive-standard",
        )}
      >
        bookmarkxyz
      </a>
      <p>bookmarkxyz project init - discover and share bookmark lists</p>

      <ThemeSelect />
      <p className="mt-16 text-sm font-medium text-slate-11">
        made by{" "}
        <a
          className="cursor-pointer font-semibold text-slate-12 hover:text-slate-11 motion-safe:duration-150 motion-safe:ease-productive-standard"
          aria-label="github profile"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/gabxyz"
        >
          gabxyz
        </a>
      </p>
    </main>
  )
}
