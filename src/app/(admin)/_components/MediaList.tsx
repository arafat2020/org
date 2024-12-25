"use client"
import { trpc } from '@/app/_trpc/client'
import { Loader2, PlusCircle } from 'lucide-react'
import React, { useEffect } from 'react'
import AddMediaDialog from './AddMediaDialog'
import { BsPlus } from 'react-icons/bs'
import Media from './Media'
import { toast } from 'sonner'
interface MediaListProp {
    bucketId?: string
}
function MediaList({
    bucketId
}: MediaListProp) {
    const { data, isLoading, refetch } = trpc.media.getMediaByBucket.useQuery({
        id: bucketId ? bucketId : ""
    })
    const utils = trpc.useUtils()
    const { mutate: deleteMedia } = trpc.media.deleMedia.useMutation({
        onSuccess: () => {
            utils.media.getMediaByBucket.invalidate({
                id: bucketId ? bucketId : ""
            })
            toast("Media File Deleted")
        },
        onError: (error) => {
            toast.error(`Something Went Wrong ${error}`)
        }
    })
    useEffect(() => {
        if (bucketId) refetch()
    }, [bucketId, refetch])
    if (isLoading) {
        return (
            <div className='w-full h-full flex justify-around items-center'>
                <Loader2 className='w-10 h-10 text-slate-100 animate-spin' />
            </div>
        );
    }
    if (!bucketId) return null
    if (data?.length) return (
        <div className='flex-grow min-h-full flex flex-col space-y-3 order p-1 border-slate-800 rounded-md bg-black rounded-l-lg'>
            <div className="flex justify-between items-center mt-3 border p-1 border-slate-800 rounded-md">
                <h1 className="text-2xl font-sans font-semibold  ">
                    Add Media File
                </h1>
                <AddMediaDialog bucketId={bucketId}>
                    <BsPlus
                        className='w-7 h-7 text-cyan-800'
                    />
                </AddMediaDialog>
            </div>
            <div className='flex flex-col space-y-3'>
                {data.map(e => (
                    <Media key={e.id} deleteMedia={deleteMedia} {...e} />
                ))}
            </div>
        </div>
    )

    return (
        <div className="flex-grow flex min-h-full justify-around items-center">
            <div className='flex flex-col items-center space-y-3 border-[3px] rounded-md p-4'>
                <span>This bucket is Empty, add new media file</span>
                <AddMediaDialog bucketId={bucketId}>
                    <PlusCircle className='w-6 h-6 text-cyan-700' />
                </AddMediaDialog>
            </div>
        </div>
    )
}

export default MediaList