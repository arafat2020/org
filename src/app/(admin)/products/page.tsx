import { SparklesPreview } from '@/app/_components/SparkleHeading'
import { serverClient } from '@/app/_trpc/serverClient'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

async function Product() {
    const products = await serverClient.getProducts()
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
                    products.length ? (<div className='w-full'>
                    </div>) : (<div className='w-full'>
                        <p className='text-center'>No Product Found....</p>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Product