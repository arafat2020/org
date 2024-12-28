"use client"
import MediaManager from '@/app/(admin)/_components/MediaManager'
import { trpc } from '@/app/_trpc/client'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import { notFound } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { useDebounceCallback } from 'usehooks-ts'

function ReviewEdit({ params }: { params: { id: string } }) {
    const utils = trpc.useUtils()
    const { data, isLoading } = trpc.cms.review.getReviewById.useQuery({
        id: params.id
    })
    const { mutate, isPending } = trpc.cms.review.editReview.useMutation({
        onSuccess: () => {
            utils.cms.review.getReviewById.invalidate({
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
    if (isLoading) {
        return (
            <div className="w-full h-auto animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-1/2 self-center mb-6"></div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-1 flex flex-col space-y-3 mb-3">
                        <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                        <div className="h-10 bg-gray-700 rounded"></div>
                    </div>
                    <div className="col-span-1 flex flex-col space-y-3 mb-3">
                        <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                        <div className="h-10 bg-gray-700 rounded"></div>
                    </div>
                    <div className="col-span-1 flex flex-col space-y-3 mb-3">
                        <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                        <div className="h-10 bg-gray-700 rounded"></div>
                    </div>
                </div>
                <div className="h-40 bg-gray-700 rounded my-6"></div>
            </div>

        )
    }
    if (!data) return notFound()
    return (
        <div className='w-full h-auto'>
            <h2 className='text-center text-2xl font-sans font-semibold p-3'>Edit Company Info</h2>
            <div className="grid grid-cols-2 gap-3">
                <div className='col-span-1 flex flex-col space-y-3 mb-3'>
                    <Label>
                        Name
                    </Label>
                    <Input onChange={e => debounceEdit({
                        name: e.target.value
                    })} defaultValue={data.name} type='text' name="Client Name" required />
                </div>
                <div className='col-span-1 flex flex-col space-y-3 mb-3'>
                    <Label>
                        link
                    </Label>
                    <Input onChange={e => debounceEdit({
                        link: e.target.value
                    })} defaultValue={data.link || ""} type='url' name="Client Contact Link" required />
                </div>
                <div className='col-span-1 flex flex-col space-y-3 mb-3'>
                    <Label>
                        Review
                    </Label>
                    <Input onChange={e => debounceEdit({
                        text: e.target.value
                    })} defaultValue={data.text || ""} type='url' name="Client Review" required />
                </div>
            </div>
            <MediaManager id={data.id} mediaId={data.mediaId} onUpdate={mutate} />
        </div>
    )
}

export default ReviewEdit