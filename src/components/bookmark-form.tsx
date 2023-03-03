"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { Pencil, Plus, Trash, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useFieldArray, useForm, useFormContext } from "react-hook-form"
import { z } from "zod"

import Modal from "@/components/modal"

import { FormSchemaType } from "./list-form"

export const BookmarkSchema = z.object({
  title: z.string().min(1, { message: "title required" }),
  url: z
    .string()
    .url({ message: "invalid url" })
    .min(1, { message: "url required" }),
  id: z.string().optional(),
})

export type BookmarkSchemaType = z.infer<typeof BookmarkSchema>

interface BookmarkFormProps {
  type: "add" | "update"
  index?: number
  initialData?: BookmarkSchemaType
}

const BookmarkForm = ({
  type,
  index,
  initialData = { title: "", url: "" },
}: BookmarkFormProps) => {
  const [modalOpen, setModalOpen] = useState(false)

  const { control } = useFormContext<FormSchemaType>()
  const {
    trigger,
    getValues,
    register,
    reset,
    formState: { isDirty, errors },
  } = useForm<BookmarkSchemaType>({
    resolver: zodResolver(BookmarkSchema),
    defaultValues: initialData,
  })

  const { append, update, remove } = useFieldArray({
    control,
    name: "bookmarks",
  })

  const onSubmit = async () => {
    const res = await trigger(["title", "url"])
    if (res && type === "add") {
      append({
        title: getValues("title"),
        url: getValues("url"),
      })
      setModalOpen(!modalOpen)
      reset()
    }
    if (res && type === "update") {
      update(index!, {
        title: getValues("title"),
        url: getValues("url"),
      })
      setModalOpen(!modalOpen)
      reset({
        title: getValues("title"),
        url: getValues("url"),
      })
    }
  }

  useEffect(() => {
    reset()
  }, [modalOpen, reset])

  return (
    <>
      <Modal
        triggerIcon={type === "add" ? <Plus size={20} /> : <Pencil size={16} />}
        closeIcon={<X size={18} />}
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
      >
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col items-start">
            <label className="mb-2 font-medium opacity-75">
              Bookmark Title
            </label>
            <input
              {...register("title")}
              className={clsx(
                errors.title && "border border-red-7",
                "-mx-px block w-full rounded-md bg-gray-6 py-1.5 px-2",
              )}
            />
            {errors.title && (
              <p className="ml-px mt-1 text-[13px] font-normal text-red-11 opacity-70">
                {errors.title?.message}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col items-start">
            <label className="mb-2 font-medium opacity-75">Bookmark URL</label>
            <input
              {...register("url")}
              className={clsx(
                errors.url && "border border-red-7",
                "-mx-px block w-full rounded-md bg-gray-6 py-1.5 px-2",
              )}
            />
            {errors.url && (
              <p className="ml-px mt-1 text-[13px] font-normal text-red-11 opacity-70">
                {errors.url?.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={!isDirty}
          onClick={() => onSubmit()}
          className="mt-4 w-3/5 self-center rounded-lg bg-gray-5 py-1.5 text-center font-medium text-gray-12 shadow-md hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:duration-150 motion-safe:ease-productive-standard"
        >
          {type === "add" ? "Add" : "Update"}
        </button>
      </Modal>
      {type !== "add" && (
        <button
          type="button"
          onClick={() => remove(index)}
          className="text-gray-11 hover:text-gray-12 motion-safe:duration-200 motion-safe:ease-productive-standard"
        >
          <Trash size={16} />
        </button>
      )}
    </>
  )
}

export default BookmarkForm
