
"use client"

import { trpc } from '@/app/_trpc/client'
import React, { useEffect, useState } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { FaSearch } from 'react-icons/fa'
import { Loader2 } from 'lucide-react'
import { useDebounceCallback } from 'usehooks-ts'
import { useRouter } from 'next/navigation'

function Product({ params }: { params: { id: string } }) {
    const { push } = useRouter()
    const { mutate, isPending, data } = trpc.product.getProductForShowBySubcategory.useMutation()

    // New state to manage client-side mounting
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);  // Mark component as mounted on the client
    }, []);

    useEffect(() => {
        if (isMounted) {
            mutate({
                subcategoryId: params.id
            })
        }
    }, [isMounted]);

    const search = useDebounceCallback((e) => {
        mutate({
            subcategoryId: params.id,
            searchTerm: e
        })
    }, 300);

    return (
        <div className='container min-h-full h-auto mt-4'>
            <div className='w-full flex justify-between items-center'>
                <h1 className='text-2xl italic font-sans'>#{isPending ? "Loading" : data?.subCategory?.name}</h1>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>{data?.subCategory?.Category?.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{data?.subCategory?.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className='w-1/2 md:w-1/3 mx-auto mt-4 flex flex-col md:flex-row space-x-2 h-[40px] p-[10px] rounded-full items-center border border-cyan-900'>
                <input onChange={e => search(e.target.value)} type="text" name="" id="" className='flex-grow bg-transparent outline-none' />
                <FaSearch className='w-6 h-6 text-cyan-900' />
            </div>
            {
                isPending ? (
                    <div className='w-full h-full flex justify-around items-center mt-6'>
                        <Loader2 className='w-10 h-10 text-slate-100 animate-spin' />
                    </div>
                ) : null
            }
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-rows-1 gap-3 mt-6 px-11'>
                {
                    data?.products.map((e) => {
                        return (
                            <div style={{
                                backgroundImage: `url(${e.primaryImg})`
                            }} key={e.id} className='col-span-1 row-span-1  h-[200px] sm:h-[250px] md:h-[300px] bg-cover bg-center bg-no-repeat rounded-lg group/product relative'>
                                <div className='w-[90%] h-[90%] bg-black/40 opacity-0 transition duration-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/product:opacity-100 rounded-lg shadow-lg flex justify-around items-center'>
                                    <button onClick={() => push(`/products/details/${e.id}`)} className="p-[3px] relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                                        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                                            View
                                        </div>
                                    </button>
                                </div>
                                <div className='w-full px-3 py-[20px] bg-slate-900/50 absolute bottom-0 left-0 rounded-b-lg duration-300 group-hover/product:scale-0'>
                                    <p className='line-clamp-1 font-sans font-semibold'>{e.name}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Product;
