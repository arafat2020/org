"use client"
import { trpc } from '@/app/_trpc/client'
import { Loader2 } from 'lucide-react'
import React from 'react'

function Edit({
    params
}: { params: { id: string } }) {
    const { data, isLoading } = trpc.getProductById.useQuery({
        id: params.id
    })
    if (isLoading) {
        return (
            <div className='w-full h-full flex justify-around items-center'>
                <Loader2 className='w-10 h-10 text-slate-100 animate-spin' />
            </div>
        )
    }
    return (
        <div className='w-full h-full overflow-y-auto'>
            <div className='w-full flex space-x-3'>
                <img src={data?.primaryImg} alt="product" className='w-1/3 rounded-[20px] ' />
            </div>
        </div>
    )
}

export default Edit