"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { ArrowUpRight, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import BookmarkForm, { BookmarkSchema } from "@/components/bookmark-form"

type initialDataProps = { listId?: string } & FormSchemaType

type FormProps = {
  type: "create" | "update"
  initialData?: initialDataProps
}

const ListSchema = z.object({
  listName: z
    .string()
    .min(1, { message: "List name is required" })
    .max(20, { message: "List name cannot exceed 20 characters" }),
  listDescription: z
    .string()
    .min(1, { message: "List description is required" })
    .max(160, { message: "List description cannot exceed 160 characters" }),
  bookmarks: z
    .array(BookmarkSchema)
    .min(1, { message: "Add at least one bookmark" }),
})

export type FormSchemaType = z.infer<typeof ListSchema>

const ListForm = ({ initialData, type }: FormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(ListSchema),
    defaultValues: initialData,
  })

  const bookmarks = methods.watch("bookmarks")

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    setIsLoading(true)
    if (type === "create") {
      try {
        const body = { ...data }
        await fetch("/api/lists/create-list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        router.push("/my-lists")
        router.refresh()
      } catch (error) {
        console.log(error)
      }
    }
    if (type === "update") {
      try {
        const body = { ...data, bookmarkListId: initialData?.listId }
        await fetch("/api/lists/update-list", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        router.push("/my-lists")
        router.refresh()
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
        spellCheck={false}
        autoComplete="off"
      >
        <div className="flex w-full flex-col items-start">
          <label className="mb-2 font-medium opacity-75">List Name</label>
          <input
            {...methods.register("listName")}
            className={clsx(
              methods.formState.errors.listName && "border border-red-7",
              "-mx-px block w-full rounded-md bg-gray-6 py-1.5 px-2",
            )}
          />
          {methods.formState.errors.listName?.message && (
            <p className="ml-px mt-1 text-[13px] font-normal text-red-11 opacity-70">
              {methods.formState.errors.listName?.message}
            </p>
          )}
        </div>
        <div className="flex w-full flex-col items-start">
          <label className="mb-2 font-medium opacity-75">
            List Description
          </label>
          <input
            {...methods.register("listDescription")}
            className={clsx(
              methods.formState.errors.listDescription && "border border-red-7",
              "-mx-px block w-full rounded-md bg-gray-6 py-1.5 px-2",
            )}
          />
          {methods.formState.errors.listDescription?.message && (
            <p className="ml-px mt-1 text-[13px] font-normal text-red-11 opacity-70">
              {methods.formState.errors.listDescription?.message}
            </p>
          )}
        </div>
        <div className="flex w-full flex-col gap-3">
          <div className="my-4 flex flex-col items-start">
            <div className="flex w-full items-center justify-between">
              <p className="font-medium opacity-75">Bookmarks</p>
              <BookmarkForm type="add" />
            </div>
            {methods.formState.errors.bookmarks?.message && (
              <p className="ml-px mt-1 text-[13px] font-normal text-red-11 opacity-70">
                {methods.formState.errors.bookmarks?.message}
              </p>
            )}
          </div>
          {bookmarks?.map((bookmark, index) => (
            <div
              key={bookmark.id}
              className="mx-px flex items-center justify-between gap-4 border-b border-gray-6 pb-4 last:border-0"
            >
              <a
                className={clsx(
                  "group inline-flex w-fit items-center justify-start truncate text-sm font-medium",
                  "underline decoration-gray-11 decoration-from-font underline-offset-auto",
                  "hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard",
                )}
                aria-label={bookmark.title}
                target="_blank"
                rel="noopener noreferrer"
                href={bookmark.url}
              >
                <p className="mr-1 truncate">{bookmark.title}</p>
                <ArrowUpRight
                  size={16}
                  className="flex-none text-gray-11 group-hover:rotate-45 motion-safe:duration-200 motion-safe:ease-productive-standard"
                />
              </a>
              <div className="flex w-1/2 items-center justify-end gap-2">
                <p className="truncate pr-px text-[13px] italic text-gray-11">
                  {bookmark.url}
                </p>
                <div className="flex items-center gap-2">
                  <BookmarkForm
                    type="update"
                    index={index}
                    initialData={bookmark}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          disabled={!methods.formState.isDirty || isLoading}
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-gray-5 py-2 text-sm font-medium text-gray-12 shadow-md hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:duration-150 motion-safe:ease-productive-standard"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <p>Save</p>
          )}
        </button>
      </form>
    </FormProvider>
  )
}

export default ListForm
