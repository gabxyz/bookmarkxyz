"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { ArrowUpRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import BookmarkForm, {
  BookmarkSchema,
  BookmarkSchemaType,
} from "@/components/bookmark-form"

type initialDataProps = { listId?: string } & FormSchemaType

type FormProps = {
  type: "create" | "update"
  initialData?: initialDataProps
}

const ListSchema = z.object({
  listName: z.string().min(1, { message: "list name required" }),
  listDescription: z.string().min(1, { message: "list description required" }),
  bookmarks: z
    .array(BookmarkSchema)
    .min(1, { message: "at least one bookmark" }),
})

export type FormSchemaType = z.infer<typeof ListSchema>

const ListForm = ({ initialData, type }: FormProps) => {
  const router = useRouter()
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(ListSchema),
    defaultValues: initialData,
  })

  const bookmarks = methods.getValues("bookmarks")

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    if (type === "create") {
      try {
        const body = { ...data }
        await fetch("/api/bookmarkLists", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        router.refresh()
        router.push("/lists")
      } catch (error) {
        console.log(error)
      }
    }
    if (type === "update") {
      try {
        const body = { ...data }
        await fetch(`/api/bookmarkLists/${initialData?.listId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        router.refresh()
        router.push("/lists")
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex h-fit w-full max-w-lg flex-col gap-4 rounded-md border border-gray-6 bg-gray-3 px-8 py-4 text-[15px] shadow-md"
      >
        <div className="flex w-full flex-col items-start">
          <label className="ml-px mb-2 font-medium opacity-75">List Name</label>
          <input
            {...methods.register("listName")}
            className={clsx(
              methods.formState.errors.listName && "border border-red-7",
              "block w-full rounded-md bg-gray-6 py-1.5 px-2",
            )}
          />
          {methods.formState.errors.listName?.message && (
            <p className="ml-px text-[13px] font-normal text-red-11 opacity-70">
              {methods.formState.errors.listName?.message}
            </p>
          )}
        </div>
        <div className="flex w-full flex-col items-start">
          <label className="ml-px mb-2 font-medium opacity-75">
            List Description
          </label>
          <input
            {...methods.register("listDescription")}
            className={clsx(
              methods.formState.errors.listDescription && "border border-red-7",
              "block w-full rounded-md bg-gray-6 py-1.5 px-2",
            )}
          />
          {methods.formState.errors.listDescription?.message && (
            <p className="ml-px text-[13px] font-normal text-red-11 opacity-70">
              {methods.formState.errors.listDescription?.message}
            </p>
          )}
        </div>
        <div className="ml-px mt-4 flex w-full flex-col gap-6">
          <div className="flex flex-col items-start">
            <div className="flex w-full items-center justify-between">
              <p className="font-medium opacity-75">Bookmarks</p>
              <BookmarkForm type="add" />
            </div>
            {methods.formState.errors.bookmarks?.message && (
              <p className="ml-px text-[13px] font-normal text-red-11 opacity-70">
                {methods.formState.errors.bookmarks?.message}
              </p>
            )}
          </div>
          {bookmarks?.map((bookmark, index) => (
            <div
              key={`bookmark.${index}.${bookmark.title}`}
              className="ml-px flex items-center justify-between border-b border-gray-6 pb-2"
            >
              <a
                className={clsx(
                  "group inline-flex items-center gap-1 text-sm font-medium",
                  "underline decoration-gray-11 decoration-from-font underline-offset-4",
                  "hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard",
                )}
                aria-label={bookmark.title}
                target="_blank"
                rel="noopener noreferrer"
                href={bookmark.url}
              >
                {bookmark.title}
                <ArrowUpRight
                  size={16}
                  className="text-gray-11 group-hover:rotate-45 motion-safe:duration-200 motion-safe:ease-productive-standard"
                />
              </a>
              <div className="flex items-center gap-3">
                <BookmarkForm
                  type="update"
                  index={index}
                  initialData={bookmark}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          disabled={
            !methods.formState.isDirty ||
            methods.formState.isSubmitting ||
            methods.formState.isSubmitSuccessful
          }
          type="submit"
          className="mt-2 w-full rounded-lg bg-gray-5 py-2 text-center text-sm font-medium text-slate-12 shadow-md hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:duration-150 motion-safe:ease-productive-standard"
        >
          Save
        </button>
      </form>
    </FormProvider>
  )
}

export default ListForm