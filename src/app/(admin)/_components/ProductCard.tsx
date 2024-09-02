"use client"
import React from 'react'
import { Product } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

type ProductCardProp = {
    SubCategory: {
        id: string;
        name: string;
        categoryId: string | null;
    } | null;
} & {
    id: string;
    name: string;
    description: string;
    catagoryId: string | null;
    primaryImg: string;
    subCategoryId: string | null;
    published: boolean;
}



function ProductCard({
    name,
    description,
    primaryImg,
    id
}: ProductCardProp) {
    return (
        <Card className='row-span-1 col-span-1' key={id}>
            <CardHeader>
                <CardTitle className='line-clamp-1'>
                    {name}
                </CardTitle>
                <CardDescription className='line-clamp-3'>
                    {description}
                </CardDescription>
                <CardContent>
                    <Image src={primaryImg} alt='product' width={250} height={500} className='rounded-[30px] mx-auto py-3' />
                </CardContent>
            </CardHeader>
        </Card>

    )
}

export default ProductCard