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
  const { data: aboutUsInfo, isLoading } = trpc.cms.aboutUs.getAboutUs.useQuery()
  const { mutate, isPending } = trpc.cms.aboutUs.editAboutUs.useMutation({
    onSuccess: () => {
      utils.cms.aboutUs.getAboutUs.invalidate()
      toast.success("Document Updated")
    },
    onError: (error) => toast.error(`error:${error.message}`)
  })
  const debounceEdit = useDebounceCallback((data: Record<string, any>) => {
    mutate({
      id: aboutUsInfo?.id || "",
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
  if (!aboutUsInfo) return notFound()
  return (
    <div className='w-full h-auto'>
      <h2 className='text-center text-2xl font-sans font-semibold p-3'>Edit About Us</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className='col-span-1 flex flex-col space-y-3 mb-3'>
          <Label>
            Description
          </Label>
          <Textarea onChange={e => debounceEdit({
            description: e.target.value
          })} defaultValue={aboutUsInfo?.description || ""} name="Banner Name" required />
        </div>
        <div className='col-span-1 flex flex-col space-y-3 mb-3'>
          <Label>
            Publish
          </Label>
          <Checkbox onCheckedChange={() => debounceEdit({
            isPublish: aboutUsInfo.isPublish ? false : true
          })} checked={aboutUsInfo.isPublish} name="Banner Name" required />
        </div>
      </div>
      <MediaManager id={aboutUsInfo.id} mediaId={aboutUsInfo?.mediaId} onUpdate={mutate} />
    </div>
  )
}

export default WhyUs