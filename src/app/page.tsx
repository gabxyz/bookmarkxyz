import clsx from "clsx"
import { ArrowRight, ArrowUpRight, Github, Twitter } from "lucide-react"

import ThemeSelect from "@/components/theme-select"

interface Tools {
  toolName: string
  toolLink: string
}

interface Stack {
  category: string
  tools: Tools[]
}

const stack: Stack[] = [
  {
    category: "Main",
    tools: [
      {
        toolName: "Next.js",
        toolLink: "https://nextjs.org/",
      },
      {
        toolName: "Prisma",
        toolLink: "https://www.prisma.io/",
      },
      {
        toolName: "PlanetScale",
        toolLink: "https://planetscale.com/",
      },
      {
        toolName: "NextAuth.js",
        toolLink: "https://next-auth.js.org/",
      },
      {
        toolName: "Typescript",
        toolLink: "https://www.typescriptlang.org/",
      },
    ],
  },
  {
    category: "UI",
    tools: [
      {
        toolName: "TailwindCSS",
        toolLink: "https://tailwindcss.com/",
      },
      {
        toolName: "Radix Primitives",
        toolLink: "https://www.radix-ui.com/",
      },
      {
        toolName: "Radix Colors",
        toolLink: "https://www.radix-ui.com/colors",
      },
      {
        toolName: "Lucide Icons",
        toolLink: "https://lucide.dev/",
      },
      {
        toolName: "Framer Motion",
        toolLink: "https://www.framer.com/motion/",
      },
    ],
  },
  {
    category: "Plugins",
    tools: [
      {
        toolName: "windy-radix-palette",
        toolLink: "https://github.com/brattonross/windy-radix-palette",
      },
      {
        toolName: "tailwindcss-radix",
        toolLink: "https://github.com/ecklf/tailwindcss-radix",
      },
      {
        toolName: "simple-import-sort",
        toolLink: "https://github.com/lydell/eslint-plugin-simple-import-sort",
      },
    ],
  },
  {
    category: "Others",
    tools: [
      {
        toolName: "next-themes",
        toolLink: "https://github.com/pacocoursey/next-themes",
      },
      {
        toolName: "react-hook-form",
        toolLink: "https://github.com/react-hook-form/react-hook-form",
      },
      {
        toolName: "zod",
        toolLink: "https://github.com/colinhacks/zod",
      },
      {
        toolName: "clsx",
        toolLink: "https://github.com/lukeed/clsx",
      },
    ],
  },
]

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-10">
      <h2 className="flex items-center justify-between gap-2 border-b border-gray-6 pt-2 pb-4 text-xl font-semibold">
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
        <ThemeSelect />
      </h2>
      <div className="flex max-w-3xl flex-col gap-6">
        <div>
          <h3 className="mb-2 font-semibold opacity-90">What is this</h3>
          <p className="text-[15px] text-gray-11">
            This is a website where you can explore bookmark lists created by
            others and share your own bookmark lists. The primary purpose of
            this website is to provide a platform for users to exchange and
            discover curated collections of relevant links related to a given
            topic/subject.
          </p>
        </div>
        <div>
          <h3 className="mb-2 font-semibold opacity-90">Why I built this</h3>
          <p className="text-[15px] text-gray-11">
            As with many of my personal projects, the main motivation behind
            creating this website was to learn and explore new technologies that
            interest me. In this case, that was RSC, using Next.js 13 RSC
            integration in their new app directory.
          </p>
        </div>
        <div>
          <h3 className="mb-2 font-semibold opacity-90">Built with</h3>
          <ul className="text-[15px]">
            {stack.map(({ category, tools }) => (
              <li
                key={category}
                className="mt-1 flex flex-wrap items-center text-gray-12"
              >
                <span className="flex items-center font-medium opacity-90">
                  {category}
                  <ArrowRight className="mx-1" size={16} />
                </span>
                {tools.map(({ toolName, toolLink }) => (
                  <div key={toolLink} className="text-gray-11">
                    <a
                      key={toolLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={toolLink}
                      className="text-gray-11 hover:text-gray-12 motion-safe:duration-200 motion-safe:ease-productive-standard"
                    >
                      {toolName}
                    </a>
                    {tools[tools.length - 1]?.toolName !== toolName && (
                      <span className="mx-1.5 mb-0.5 inline-flex h-1 w-1 flex-none rounded-full bg-gray-11"></span>
                    )}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-3">
            <h3 className="font-semibold opacity-90">Me</h3>
            <div className="flex items-center gap-1.5">
              <a
                className={clsx(
                  "cursor-pointer text-gray-11",
                  "hover:text-gray-12 hover:opacity-80",
                  "motion-safe:duration-200 motion-safe:ease-productive-standard",
                )}
                aria-label="Gabriel's twitter profile link"
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/gabxyzz"
              >
                <Twitter size={16} />
              </a>
              <a
                className={clsx(
                  "cursor-pointer text-gray-11",
                  "hover:text-gray-12 hover:opacity-80",
                  "motion-safe:duration-200 motion-safe:ease-productive-standard",
                )}
                aria-label="Gabriel's github profile link"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/gabxyz"
              >
                <Github size={16} />
              </a>
            </div>
          </div>
          <p className="text-[15px] text-gray-11">
            I'm{" "}
            <span className="font-medium text-gray-12 opacity-80">Gabriel</span>
            , a front-end developer with great interest in UI/UX, passionate
            about well-crafted, polished user interfaces that provide great
            experiences through attention to detail and interaction.
          </p>
        </div>
        <div>
          <h3 className="mb-2 font-semibold opacity-90">Resources</h3>
          <div className="mb-2">
            <a
              className={clsx(
                "group inline-flex w-fit items-center justify-start truncate text-[15px] font-medium",
                "underline decoration-gray-11 decoration-dashed decoration-from-font underline-offset-2",
                "hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard",
              )}
              aria-label="read.cv's website"
              target="_blank"
              rel="noopener noreferrer"
              href="https://read.cv"
            >
              <p className="mr-1 truncate">read.cv</p>
              <ArrowUpRight
                size={16}
                className="flex-none text-gray-11 group-hover:rotate-45 motion-safe:duration-200 motion-safe:ease-productive-standard"
              />
            </a>
            <p className="mt-1 text-[15px] text-gray-11">
              The UI of this website was heavily inspired by read.cv, an amazing
              website that I definitely recommend checking out, really
              beautiful, smooth UI and a great place to find talented people and
              their work.
            </p>
          </div>
          <div>
            <a
              className={clsx(
                "group inline-flex w-fit items-center justify-start truncate text-[15px] font-medium",
                "underline decoration-gray-11 decoration-dashed decoration-from-font underline-offset-2",
                "hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard",
              )}
              aria-label="read.cv's website"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/shadcn/taxonomy"
            >
              <p className="mr-1 truncate">taxonomy</p>
              <ArrowUpRight
                size={16}
                className="flex-none text-gray-11 group-hover:rotate-45 motion-safe:duration-200 motion-safe:ease-productive-standard"
              />
            </a>
            <p className="mt-1 text-[15px] text-gray-11">
              Built by shadcn, taxonomy was insanely helpful in the process of
              building this website, I strongly recommend taking a look at the
              repository if you're exploring RSC and Next.js app directory.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
