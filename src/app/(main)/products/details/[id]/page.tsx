
"use client"

import { trpc } from '@/app/_trpc/client'
import Marquee from '@/components/magicui/marquee';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'

function Details({ params }: { params: { id: string } }) {
    const [img, setImg] = useState<string | undefined>("")
    const {
        mutate,
        data,
        isPending
    } = trpc.product.getProductForShowById.useMutation({
        onSuccess: (data) => {
            setImg(data.product?.primaryImg)
        }
    });
    useEffect(() => {
        mutate({
            productId: params.id
        })
    }, [])
    if (isPending) {
        return (
            <div className='w-full h-full flex justify-around items-center'>
                <Loader2 className='w-10 h-10 text-slate-100 animate-spin' />
            </div>
        );
    }
    return (
        <div className='container min-h-full h-auto'>
            <div className='w-full flex flex-col md:flex-row mt-3 md:space-x-6'>
                <div style={{
                    backgroundImage: `url(${img})`
                }} className='w-full sm:w-2/3 mx-auto md:mx-0 mb-3 md:mb-0 md:w-1/4 h-[450px] rounded-lg bg-center bg-cover bg-no-repeat'/>
                <div className='w-[100%] md:w-2/3 '>
                    <h2 className='text-xl font-sans font-semibold mb-3'>{data?.product?.name}</h2>
                    <p className='line-clamp-[7]'>{data?.product?.description}</p>
                    <div className='w-full mt-4 grid grid-cols-3 lg:grid-cols-5 grid-rows-1 gap-3'>
                        {
                            data?.product?.showcaseImg.map(e => (
                                <div key={e.id} onMouseEnter={() => {
                                    setImg(e.img)
                                }} style={{
                                    backgroundImage: `url(${e.img})`
                                }} className='col-span-1 row-span-1 h-[300px] bg-center rounded-lg duration-300 hover:scale-110'>

                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <h2 className='text-2xl font-sans font-semibold text-center my-6'>Smiler Products</h2>
            <Marquee pauseOnHover className='[--duration:20s]'>
                {
                    data?.simileProduct.map(e=>(
                        <figure key={e.id}
                        className={cn(
                          "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                          // light styles
                          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                          // dark styles
                          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                        )}
                      >
                        <div className="flex flex-row items-center gap-2">
                          <img className="rounded-lg" width="100" alt="" src={e.primaryImg} />
                          <div className="flex flex-col">
                            <figcaption className="text-sm font-medium dark:text-white line-clamp-1">
                              {e.name}
                            </figcaption>
                            <p className="text-xs font-medium dark:text-white/40">{e.SubCategory?.name}</p>
                          </div>
                        </div>
                        <blockquote className="mt-2 text-sm line-clamp-3">{e.description}</blockquote>
                      </figure>
                    ))
                }
            </Marquee>
        </div>
    )
}

export default Details