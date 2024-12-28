"use client"
import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { toast } from 'sonner'

function Banner() {
  const utils = trpc.useUtils()
  const { mutate, isPending } = trpc.cms.banner.createBanner.useMutation({
    onSuccess: () => {
      toast.success("New Banner Added")
      utils.cms.banner.getBanner.invalidate()
    },
    onError: (error) => toast.error(`Error:${error.message}`)
  })
  const { mutate: deleteBanner, isPending: isDeletePending } = trpc.cms.banner.deleteBanner.useMutation({
    onSuccess: () => {
      toast.success("Banner Deleted")
      utils.cms.banner.getBanner.invalidate()
    },
    onError: (error) => toast.error(`Error:${error.message}`)
  })
  const { push } = useRouter()
  const { data, isLoading } = trpc.cms.banner.getBanner.useQuery()
  if (isLoading) {
    return (
      <div className='w-full h-auto animate-pulse'>
        <div className="w-full flex m-6 justify-between items-center">
          <div className="w-32 h-6 bg-gray-700 rounded"></div>
          <div className="w-32 h-6 bg-gray-700 rounded"></div>
        </div>
        <div className='w-full grid grid-cols-4 gap-3'>
          <figure className="relative col-span-1 overflow-hidden rounded-xl border p-4">
            <div className="flex flex-row items-center gap-2">
              <div
                className="rounded-lg object-cover w-24 h-16 bg-gray-700"
              />

              <div className="h-4 bg-gray-700 rounded w-24"></div>
            </div>

            <div className="mt-4 flex justify-between gap-2">
              <div
                className="flex-1 flex items-center justify-center gap-2 rounded-md border py-2 h-6 bg-gray-700"
              ></div>
              <div
                className="flex-1 flex items-center justify-center gap-2 rounded-md border py-2 h-6 bg-gray-700"
              ></div>
            </div>
          </figure>
          <figure className="relative col-span-1 overflow-hidden rounded-xl border p-4">
            <div className="flex flex-row items-center gap-2">
              <div
                className="rounded-lg object-cover w-24 h-16 bg-gray-700"
              />

              <div className="h-4 bg-gray-700 rounded w-24"></div>
            </div>

            <div className="mt-4 flex justify-between gap-2">
              <div
                className="flex-1 flex items-center justify-center gap-2 rounded-md border py-2 h-6 bg-gray-700"
              ></div>
              <div
                className="flex-1 flex items-center justify-center gap-2 rounded-md border py-2 h-6 bg-gray-700"
              ></div>
            </div>
          </figure>
          <figure className="relative col-span-1 overflow-hidden rounded-xl border p-4">
            <div className="flex flex-row items-center gap-2">
              <div
                className="rounded-lg object-cover w-24 h-16 bg-gray-700"
              />

              <div className="h-4 bg-gray-700 rounded w-24"></div>
            </div>

            <div className="mt-4 flex justify-between gap-2">
              <div
                className="flex-1 flex items-center justify-center gap-2 rounded-md border py-2 h-6 bg-gray-700"
              ></div>
              <div
                className="flex-1 flex items-center justify-center gap-2 rounded-md border py-2 h-6 bg-gray-700"
              ></div>
            </div>
          </figure>
          <figure className="relative col-span-1 overflow-hidden rounded-xl border p-4">
            <div className="flex flex-row items-center gap-2">
              <div
                className="rounded-lg object-cover w-24 h-16 bg-gray-700"
              />

              <div className="h-4 bg-gray-700 rounded w-24"></div>
            </div>

            <div className="mt-4 flex justify-between gap-2">
              <div
                className="flex-1 flex items-center justify-center gap-2 rounded-md border py-2 h-6 bg-gray-700"
              ></div>
              <div
                className="flex-1 flex items-center justify-center gap-2 rounded-md border py-2 h-6 bg-gray-700"
              ></div>
            </div>
          </figure>
        </div>
      </div>
    )
  }
  return (
    <div className='w-full h-auto'>
      <div className="w-full flex m-6 justify-between items-center">
        <h2 className="text-2xl font-sans font-semibold">Banner List</h2>
        <Button disabled={isPending} onClick={() => mutate()}>Add Banner</Button>
      </div>
      <div className='w-full grid grid-cols-4 gap-3'>
        {
          data?.map(e => (

            <figure
              key={e.id}
              className={cn(
                "relative col-span-1 overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <img
                  className="rounded-lg object-cover"
                  width="120"
                  height="80"
                  alt=""
                  src={e.pic ? e.pic.url : '/industry.svg'}
                />
                <div className="flex flex-col">
                  <figcaption
                    className={cn(
                      "text-sm font-medium dark:text-white capitalize",
                      e.name === "Untitled" && "italic"
                    )}
                  >
                    {e.name}
                  </figcaption>
                </div>
              </div>

              {/* Buttons Section */}
              <div className="mt-4 flex justify-between gap-2">
                {/* Edit Button */}
                <button
                  onClick={(event) => {
                    event.stopPropagation(); // Prevents triggering the figure's onClick
                    push(`/cms/banner/edit/${e.id}`);
                  }}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 rounded-md border border-gray-950/[.2] bg-gray-950/[.05] py-2 text-sm font-medium text-gray-800 hover:bg-gray-950/[.1]",
                    "dark:border-gray-50/[.2] dark:bg-gray-50/[.05] dark:text-gray-200 dark:hover:bg-gray-50/[.1]"
                  )}
                >
                  <FiEdit2 className="h-4 w-4" /> Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={(event) => {
                    event.stopPropagation(); // Prevents triggering the figure's onClick
                    if (confirm("Are you sure you want to delete this item?")) {
                      deleteBanner({
                        id: e.id
                      })
                    }
                  }}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 rounded-md border border-gray-950/[.2] bg-gray-950/[.05] py-2 text-sm font-medium text-gray-800 hover:bg-red-100",
                    "dark:border-gray-50/[.2] dark:bg-gray-50/[.05] dark:text-gray-200 dark:hover:bg-red-200 dark:hover:text-slate-700"
                  )}
                >
                  <FiTrash2 className="h-4 w-4 text-red-600" /> Delete
                </button>
              </div>
            </figure>

          ))
        }
      </div>
    </div>
  )
}

export default Banner