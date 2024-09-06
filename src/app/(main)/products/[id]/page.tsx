
"use client"

import { trpc } from '@/app/_trpc/client'
import React from 'react'

function page({ params }: { params: { id: string } }) {
    const { mutate, isPending } = trpc.product.getProductForShowBySubcategory.useMutation()
    return (
        <div className='container min-h-full h-auto'>
            <div className='w-full flex justify'>

            </div>
        </div>
    )
}

export default page