"use client"
import MediaManager from '@/app/(admin)/_components/MediaManager'
import { trpc } from '@/app/_trpc/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { notFound } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { useDebounceCallback } from 'usehooks-ts'

function EditBanner({ params }: { params: { id: string } }) {
  const utils = trpc.useUtils()
  const { data, isLoading } = trpc.cms.banner.getBannerById.useQuery({
    id: params.id
  })
  const { mutate, isPending } = trpc.cms.banner.updateBanner.useMutation({
    onSuccess: () => {
      utils.cms.banner.getBannerById.invalidate({
        id: params.id
      })
      toast.success("Document Updated")
    },
    onError: (error) => toast.error(`error:${error.message}`)
  })
  const debounceEdit = useDebounceCallback((data: Record<string, any>) => {
    mutate({
      id: params.id,
      ...data
    })
  }, 400)
  if (isLoading) return (
    <div className="w-full h-auto animate-pulse">
      <div className="h-6 bg-gray-700 w-full mt-3"></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-1 flex flex-col space-y-3 mb-3">
          <div className="h-6 bg-gray-700 w-1/2 mt-3"></div>
          <div className="h-10 bg-gray-700 rounded w-full mt-2"></div>
        </div>
        <div className="col-span-1 flex flex-col space-y-3 mb-3">
          <div className="h-6 bg-gray-700 w-1/2 mt-3"></div>
          <div className="h-10 bg-gray-700 rounded w-full mt-2"></div>
        </div>
      </div>
      <div className="h-auto bg-gray-700 rounded w-full mt-2"></div>
    </div>
  )
  if (!data) return notFound()
  return (
    <div>
      <div className='w-full h-auto'>
        <h2 className='text-center text-2xl font-sans font-semibold p-3'>Edit Company Info</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className='col-span-1 flex flex-col space-y-3 mb-3'>
            <Label>
              Banner Name
            </Label>
            <Input onChange={e => debounceEdit({
              name: e.target.value
            })} defaultValue={data.name || ""} type='text' name="Banner Name" required />
          </div>
        </div>
        <MediaManager id={data.id} mediaId={data.mediaId} onUpdate={mutate} />
      </div>
    </div>
  )
}

export default EditBanner