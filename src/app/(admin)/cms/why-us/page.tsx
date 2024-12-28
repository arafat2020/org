"use client"
import { trpc } from '@/app/_trpc/client'
import { Label } from '@/components/ui/label'
import React from 'react'
import { toast } from 'sonner'
import { useDebounceCallback } from 'usehooks-ts'
import MediaManager from '../../_components/MediaManager'
import { notFound } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

function WhyUs() {
  const utils = trpc.useUtils()
  const { data: whyUsInfo, isLoading } = trpc.cms.whyUs.getWhyUs.useQuery()
  const { mutate, isPending } = trpc.cms.whyUs.editWhyUs.useMutation({
    onSuccess: () => {
      utils.cms.whyUs.getWhyUs.invalidate()
      toast.success("Document Updated")
    },
    onError: (error) => toast.error(`error:${error.message}`)
  })
  const debounceEdit = useDebounceCallback((data: Record<string, any>) => {
    mutate({
      id: whyUsInfo?.id || "",
      ...data
    })
  }, 400)
  if (isLoading) {
    return (
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
  }
  if (!whyUsInfo) return notFound()
  return (
    <div className='w-full h-auto'>
      <h2 className='text-center text-2xl font-sans font-semibold p-3'>Edit Why Us</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className='col-span-1 flex flex-col space-y-3 mb-3'>
          <Label>
            Description
          </Label>
          <Textarea onChange={e => debounceEdit({
            description: e.target.value
          })} defaultValue={whyUsInfo?.description || ""} name="Banner Name" required />
        </div>
        <div className='col-span-1 flex flex-col space-y-3 mb-3'>
          <Label>
            Publish
          </Label>
          <Checkbox onCheckedChange={() => debounceEdit({
            isPublish: whyUsInfo.isPublish ? false : true
          })} checked={whyUsInfo.isPublish} name="Banner Name" required />
        </div>
      </div>
      <MediaManager id={whyUsInfo.id} mediaId={whyUsInfo?.mediaId} onUpdate={mutate} />
    </div>
  )
}

export default WhyUs