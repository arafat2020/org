"use client"
import React, { useState } from 'react'
import MediaList from '../_components/MediaList'
import { trpc } from '@/app/_trpc/client'
import { BsPlus } from 'react-icons/bs'
import { toast } from 'sonner'
import { useDebounceCallback } from 'usehooks-ts'
import Bucket from '../_components/Bucket'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

function Buckets() {
  const [BucketId, setBucketId] = useState<string>()
  const { data: buckets, isLoading } = trpc.bucket.getAllBucket.useQuery()
  const utils = trpc.useUtils()
  const { mutate: editBucket } = trpc.bucket.updateBucket.useMutation({
    onMutate: () => {
      toast("Bucket Name Updated")
    },
    onError: (error) => {
      toast.error(`Something Went Wrong ${error}`)
    }
  })
  const { mutate: deleteBucket } = trpc.bucket.deleteBucket.useMutation({
    onSuccess: () => {
      utils.bucket.getAllBucket.invalidate()
      utils.media.getMediaByBucket.invalidate({
        id: BucketId
      })
      toast("Bucket Deleted")
    },
    onError: (error) => {
      toast.error(`Something Went Wrong ${error}`)
    }
  })
  const {mutate:addBucket} = trpc.bucket.createBucket.useMutation({
    onSuccess: () => {
      utils.bucket.getAllBucket.invalidate()
      toast("New Bucket added")
    },
    onError: (error) => {
      toast.error(`Something Went Wrong ${error}`)
    }
  })
  const editBucketDebounce = useDebounceCallback((id: string, name: string) => editBucket({ id, name }), 400)
  if (isLoading) {
    return (
        <div className='w-full h-full flex justify-around items-center'>
            <Loader2 className='w-10 h-10 text-slate-100 animate-spin' />
        </div>
    );
}
  return (
    <div className='w-full min-h-full flex space-x-3'>
      <div className='w-1/3'>
        <div className="flex justify-between items-center mt-3 border p-1 border-slate-800 rounded-md">
          <h1 className="text-2xl font-sans font-semibold  ">
            Add bucket
          </h1>
          <BsPlus
            role='button'
            onClick={()=>addBucket()}
            className='w-7 h-7 text-cyan-800'
          />
        </div>
        <div className={cn("w-full flex flex-col p-2 space-y-3",buckets?.length && "border border-slate-800")}>
          {buckets?.map(e => (
            <Bucket
              setBucket={() => setBucketId(e.id)}
              deleteBucket={deleteBucket}
              editBucketDebounce={editBucketDebounce}
              key={e.id}
              {...e}
            />
          ))}
        </div>
      </div>
      <MediaList bucketId={BucketId}/>
    </div>
  )
}

export default Buckets