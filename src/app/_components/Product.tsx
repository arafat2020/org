
"use client"

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface ProductProp{
    img: string,
    url?: string
}

function Product({
    img,
    url,
}: ProductProp) {
    return (
        <div  className="col-span-1 row-span-1 bg-red-200">

            <div className='top-0 left-0 w-full h-full rounded-md bg-black/50 opacity-0 group-hover/product:opacity-100 transition duration-300'>

            </div>
        </div>
    )
}

export default Product