"use client"
import { trpc } from '@/app/_trpc/client'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { toast } from 'sonner'
import { useDebounceCallback } from 'usehooks-ts'
import MediaManager from '../../_components/MediaManager'
import { notFound } from 'next/navigation'

function Factory() {
    const utils = trpc.useUtils()
    const { data: factoryInfo, isLoading } = trpc.cms.factory.getFactory.useQuery()
    const { mutate, isPending } = trpc.cms.factory.editFactory.useMutation({
        onSuccess: () => {
            utils.cms.factory.getFactory.invalidate()
            toast.success("Document Updated")
        },
        onError: (error) => toast.error(`error:${error.message}`)
    })
    const { mutate: connectToMedia, isPending: mediaPending } = trpc.cms.factory.connectToMedia.useMutation({
        onSuccess: () => {
            utils.cms.factory.getFactory.invalidate()
            toast.success("Document Updated")
        },
        onError: (error) => toast.error(`error:${error.message}`)
    })
    const debounceEdit = useDebounceCallback((data: Record<string, any>) => {
        mutate({
            id: factoryInfo?.id || "",
            ...data
        })
    }, 400)
    function connect({id, mediaId}:{id: string, mediaId?:string|null}){
        mediaId && connectToMedia({
            id,
            mediaId
        })
    }
    if(isLoading) return null
    if (!factoryInfo) return notFound()
    return (
        <div className='w-full h-full'>

            <h2 className='text-center text-2xl font-sans font-semibold p-3'>Edit Factory Info</h2>
            <div className="grid grid-cols-2 gap-3">
                <div className='col-span-1 flex flex-col space-y-3 mb-3'>
                    <Label>
                        Description
                    </Label>
                    <Textarea onChange={e => debounceEdit({
                        description: e.target.value
                    })} defaultValue={factoryInfo?.description || ""} name="Banner Name" required />
                </div>
                <div className='col-span-1 flex flex-col space-y-3 mb-3'>
                    <Label>
                        Publish
                    </Label>
                    <Checkbox onCheckedChange={() => debounceEdit({
                        isPublish: factoryInfo.isPublish ? false : true
                    })} checked={factoryInfo.isPublish} name="Banner Name" required />
                </div>
            </div>
            <MediaManager id={factoryInfo.id} arrayOfIds={factoryInfo.media.map(e=>{
                return e.id
            })} onUpdate={connect} />
        </div>
    )
}

export default Factory