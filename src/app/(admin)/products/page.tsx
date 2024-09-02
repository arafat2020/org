import { SparklesPreview } from '@/app/_components/SparkleHeading'
import { serverClient } from '@/app/_trpc/serverClient'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
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
                    products.length ? (<div className='w-full grid gap-3 grid-cols-3 grid-row-1'>
                        {
                            products.map(e => {
                                return (
                                    <Card className='row-span-1 col-span-1' key={e.id}>
                                        <CardHeader>
                                            <CardTitle className='line-clamp-1'>
                                                {e.name}
                                            </CardTitle>
                                            <CardDescription className='line-clamp-3'>
                                                {e.description}
                                            </CardDescription>
                                            <CardContent>
                                                <Image src={e.primaryImg} alt='product' width={250} height={500} className='rounded-[30px] mx-auto py-3'/>
                                            </CardContent>
                                        </CardHeader>
                                    </Card>
                                )
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