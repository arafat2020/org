
"use client"

import { SparklesPreview } from '@/app/_components/SparkleHeading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import ProductCard from '../_components/ProductCard'
import { trpc } from '@/app/_trpc/client'
import { Loader2 } from 'lucide-react'

async function Product() {
    const { data, isLoading } = trpc.getProducts.useQuery();
    if (isLoading) {
        return (
            <div className='w-full h-full flex justify-around items-center'>
                <Loader2 className='w-10 h-10 text-slate-100 animate-spin' />
            </div>
        )
    }
    return (
        <div className='w-full h-auto relative'>
            <Button className='right-0 top-0 absolute'>
                <Link href='/products/add'>
                    Add Product
                </Link>
            </Button>
            <SparklesPreview title='All Products' />
            <div>
                {
                    data?.length ? (<div className='w-full grid gap-3 grid-cols-3 grid-row-1'>
                        {
                            data.map(e => {
                                return (
                                    <ProductCard key={e.id} {...e} />                                )
                            })
                        }
                    </div>) : (<div className='w-full'>
                        <p className='text-center'>No Product Found....</p>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Product