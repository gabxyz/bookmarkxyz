"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const ProfileSchema = z.object({
  username: z
    .string()
    .min(4, { message: "username should have at least 4 characters" }),
  bio: z.string(),
})

type ProfileSchemaType = z.infer<typeof ProfileSchema>

type ProfileFormProps = Omit<User, "emailVerified" | "image">

const ProfileForm = ({ name, email, username, bio }: ProfileFormProps) => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    setError,
    reset,
    getValues,
    formState: { errors, isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: { username: username!, bio: bio! },
  })

  const onSubmit: SubmitHandler<ProfileSchemaType> = async (data) => {
    try {
      const body = { ...data }
      const res = await fetch("/api/user/update-user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (res.status === 409) {
        const { error } = await res.json()
        setError("username", { type: "custom", message: error })
      }
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...getValues() })
    }
  }, [isSubmitSuccessful, reset, getValues])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-fit w-full max-w-lg flex-col gap-4 rounded-md border border-gray-6 bg-gray-3 px-8 py-4 text-[15px] shadow-md"
      spellCheck={false}
      autoComplete="off"
    >
      <div className="flex w-full flex-col items-start">
        <label className="mb-2 font-medium opacity-75">Name</label>
        <input
          disabled
          value={name!}
          className={clsx(
            "-mx-px block w-full rounded-md bg-gray-6 py-1.5 px-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
        />
      </div>
      <div className="flex w-full flex-col items-start">
        <label className="mb-2 font-medium opacity-75">Email</label>
        <input
          disabled
          value={email!}
          className={clsx(
            "-mx-px block w-full rounded-md bg-gray-6 py-1.5 px-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
        />
      </div>
      <div className="flex w-full flex-col items-start">
        <label className="mb-2 font-medium opacity-75">Username</label>
        <input
          {...register("username")}
          className={clsx(
            errors.username && "border border-red-7",
            "-mx-px block w-full rounded-md bg-gray-6 py-1.5 px-2",
          )}
        />
        {errors.username?.message && (
          <p className="ml-px mt-1 text-[13px] font-normal text-red-11 opacity-70">
            {errors.username?.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col items-start">
        <label className="mb-2 font-medium opacity-75">Bio</label>
        <textarea
          {...register("bio")}
          className={clsx(
            errors.bio && "border border-red-7",
            "-mx-px block w-full rounded-md bg-gray-6 py-1.5 px-2",
          )}
        />
        {errors.bio?.message && (
          <p className="ml-px mt-1 text-[13px] font-normal text-red-11 opacity-70">
            {errors.bio?.message}
          </p>
        )}
      </div>
      <button
        disabled={!isDirty || isSubmitting}
        type="submit"
        className="mt-2 w-full rounded-lg bg-gray-5 py-2 text-center text-sm font-medium text-gray-12 shadow-md hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:duration-150 motion-safe:ease-productive-standard"
      >
        Save
      </button>
    </form>
  )
}
export default ProfileForm