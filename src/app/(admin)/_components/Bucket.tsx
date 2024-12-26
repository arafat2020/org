"use client"
import { cn } from '@/lib/utils'
import { Edit, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { BsBucket } from 'react-icons/bs'
interface BucketProp {
    name: string,
    id: string,
    editBucketDebounce: (id: string, name: string) => void,
    deleteBucket: ({ id }: { id: string }) => void,
    setBucket: () => void
}
function Bucket({
    name,
    id,
    editBucketDebounce,
    deleteBucket,
    setBucket
}: BucketProp) {
    const [edit, setEdit] = useState<boolean>(true)
    return (
        <div onClick={setBucket} className='w-full flex space-x-3 cursor-pointer items-center border border-slate-800 rounded-md p-2 bg-black'>
            <BsBucket/>
            <input
                onChange={e => editBucketDebounce(id, e.target.value)}
                disabled={edit} defaultValue={name} type="text" className={cn("w-[100px] px-1 rounded-sm outline-none bg-transparent text-[1rem] flex-grow",
                    !edit && "bg-cyan-700"
                )} />
            <button onClick={() => setEdit(state => !state)}>
                <Edit className='w-6 h-6' />
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    if (confirm("Are you sure? The bucket and all media in this bucket will be deleted")) deleteBucket({
                        id
                    })
                }}
            >
                <Trash className='w-6 h-6' />
            </button>
        </div>
    )
}

export default Bucket