# bookmarkxyz

## What is this

This is a website where you can explore bookmark lists created by others and share your own bookmark lists. The primary purpose of this website is to provide a platform for users to exchange and discover curated collections of relevant links related to a given topic/subject.

**Check out the [Live Website](https://bookmarkxyz.vercel.app/)**

## Why I built this

As with many of my personal projects, the main motivation behind creating this website was to learn and explore new technologies that interest me. In this case, that was RSC, using Next.js 13 RSC integration in their new app directory.

## How does it work

There's nothing too complex about it, to better explain this, let's break this into public pages that can be accessed by anyone and protected pages that require user authentication.

**Public pages: `/explore`, `/profile/[username]`, `/login`.**

- `/explore` - This page displays up to 15 recently created list cards.

- `/profile/[username]` - Public user profile page. It displays the user information at the top such as name, bio, and social links, along with all the lists they have created.

- `/login` - This is the login page, where you can login to an existing account or create a new one with GitHub or Google.

**Protected pages: `/profile/me`, `/my-lists`, `/create-list`, `/edit-list`.**

- `/profile/me` - Page where you can add/update your profile information. On your first login, a unique username is generated for you based on your email. You can change it if you want to.

- `/my-lists` - In this page you will find lists created by you and a button to create a new list, that will redirect you to the `/create-list` route.

- `/create-list` - In this page you can fill out the form to create a new list. The form uses `react-hook-form` and `zod` for validation.

- `/edit-list` - This page renders a list form filled with existing data from the list you want to edit. This page can be accessed by clicking on the pencil icon in the list card that renders only if the authenticated user is also the author of the given list.

## Built with

### Main

- [Next.js](https://nextjs.org)
- [Prisma](https://www.prisma.io)
- [PlanetScale](https://planetscale.com)
- [NextAuth.js](https://next-auth.js.org)
- [Typescript](https://www.typescriptlang.org)

### UI

- [TailwindCSS](https://tailwindcss.com)
- [Radix Primitives](https://www.radix-ui.com)
- [Radix Colors](https://www.radix-ui.com/colors)
- [Lucide Icons](https://lucide.dev)
- [Framer Motion](https://www.framer.com/motion)

### Plugins

- [windy-radix-palette](https://github.com/brattonross/windy-radix-palette)
- [tailwindcss-radix](https://github.com/ecklf/tailwindcss-radix)
- [simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)

### Others

- [next-themes](https://github.com/pacocoursey/next-themes)
- [react-hook-form](https://github.com/react-hook-form/react-hook-form)
- [zod](https://github.com/colinhacks/zod)
- [clsx](https://github.com/lukeed/clsx)

**bootstrapped with [next-app-themes](https://github.com/gabxyz/next-app-themes)**

## Resources

**[read.cv](https://read.cv)** - The UI of this website was inspired by read.cv, an amazing website that I definitely recommend checking out, really beautiful, smooth UI and a great place to find talented people and their work.

**[taxonomy](https://github.com/shadcn/taxonomy)** - Built by shadcn, taxonomy was insanely helpful in the process of building this website, I strongly recommend taking a look at the repository if you're exploring RSC and Next.js app directory.

Follow me on twitter [@gabxyzz](https://twitter.com/gabxyzz)
