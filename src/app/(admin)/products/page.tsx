import { SparklesPreview } from '@/app/_components/SparkleHeading'
import { serverClient } from '@/app/_trpc/serverClient'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductCard from '../_components/ProductCard'

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
                    products.length ? (<div className='w-full grid gap-3 grid-cols-3 grid-row-1'>
                        {
                            products.map(e => {
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