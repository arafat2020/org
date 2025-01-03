"use client"
import { Trash } from 'lucide-react'
import React from 'react'
interface MediaProp {
    id: string,
    url: string,
    name: string,
    deleteMedia: ({ id }: { id: string }) => void,
}
function Media({
    id,
    name,
    url,
    deleteMedia
}: MediaProp) {
    return (
        <div className='w-full flex space-x-3 cursor-pointer items-center border-[3px] bg-black/10 border-slate-800/50 rounded-md p-2'>
            <img loading='lazy' src={url} alt={name} className='w-14 h-14 object-fill rounded-md'/>
            <p className='flex-grow font-sans font-semibold capitalize line-clamp-1'>{name}</p>
            <button
                onClick={() => deleteMedia({
                    id
                })}
            >
                <Trash className='w-6 h-6' />
            </button>
        </div>
    )
}

export default Media