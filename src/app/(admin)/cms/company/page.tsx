"use client"
import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

function Company() {
  const utils = trpc.useUtils()
  const { mutate, isPending } = trpc.cms.company.createCompany.useMutation({
    onSuccess: () => {
      toast.success("New Company Added")
      utils.cms.company.getCompany.invalidate()
    },
    onError: (error) => toast.error(`Error:${error.message}`)
  })
  const { push } = useRouter()
  const { data, isLoading } = trpc.cms.company.getCompany.useQuery()
  if (isLoading) {
    return (
      <div className="w-full h-auto animate-pulse">
        <div className="w-full flex m-6 justify-between items-center">
          <div className="w-32 h-6 bg-gray-700 rounded"></div>
          <div className="h-10 w-20 bg-gray-700 rounded"></div>
        </div>
        <div className="w-full grid grid-cols-4 gap-4">
          <figure className="relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 bg-gray-700">
            <div className="flex flex-row items-center gap-2">
              <div className="rounded-full h-16 w-16 bg-gray-700"></div>
              <div className="flex flex-col">
                <figcaption className="h-4 bg-gray-700 rounded w-3/4"></figcaption>
              </div>
            </div>
          </figure>
          <figure className="relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 bg-gray-700">
            <div className="flex flex-row items-center gap-2">
              <div className="rounded-full h-16 w-16 bg-gray-700"></div>
              <div className="flex flex-col">
                <figcaption className="h-4 bg-gray-700 rounded w-3/4"></figcaption>
              </div>
            </div>
          </figure>
          <figure className="relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 bg-gray-700">
            <div className="flex flex-row items-center gap-2">
              <div className="rounded-full h-16 w-16 bg-gray-700"></div>
              <div className="flex flex-col">
                <figcaption className="h-4 bg-gray-700 rounded w-3/4"></figcaption>
              </div>
            </div>
          </figure>
          <figure className="relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 bg-gray-700">
            <div className="flex flex-row items-center gap-2">
              <div className="rounded-full h-16 w-16 bg-gray-700"></div>
              <div className="flex flex-col">
                <figcaption className="h-4 bg-gray-700 rounded w-3/4"></figcaption>
              </div>
            </div>
          </figure>
        </div>
      </div>

    )
  }
  return (
    <div className='w-full h-auto'>
      <div className="w-full flex m-6 justify-between items-center">
        <h2 className="text-1xl font-sans font-semibold">Company List</h2>
        <Button onClick={() => mutate()}>Add Company</Button>
      </div>
      <div className='w-full grid grid-cols-4'>
        {
          data?.map(e => (
            <figure
              onClick={() => push(`/cms/company/edit/${e.id}`)}
              key={e.id}
              className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 cursor-pointer",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="70" height="70" alt="" src={e.pic ? e.pic.url : '/industry.svg'} />
                <div className="flex flex-col">
                  <figcaption className={cn("text-sm font-medium dark:text-white capitalize", e.name === "Untitled" && "italic")}>
                    {e.name}
                  </figcaption>
                </div>
              </div>
            </figure>
          ))
        }
      </div>
    </div>
  )
}

export default Company