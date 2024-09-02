"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { trpc } from '@/app/_trpc/client'
import { toast } from 'sonner'

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
    id,
    SubCategory,
    published
}: ProductCardProp) {
    const [active, setActive] = useState<boolean>(published);
    const {
        mutate,
        isPending
    } = trpc.inactiveProduct.useMutation({
        onSuccess: (data) => {
            setActive(data.published)
            toast.success(`Product set to ${data.published ? "Active" : "Inactive"}`)
        },
        onError: (error) => {
            toast.error(
                <div>
                    <p>Failed To Perform Operation...</p>
                    <p>{error.message}</p>
                </div>
            )
        }
    })
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
                    <img src={primaryImg} alt='product' className='w-[80%] h-[300px] rounded-[20px] mx-auto py-3' />
                    <p className='italic'>#{SubCategory?.name}</p>
                </CardContent>
                <CardFooter className='flex justify-between items-center'>
                    <div className='flex space-x-3 p-1 rounded-full border shadow-inner'>
                        <Badge variant={active ? "default" : "destructive"}>{active ? "Active" : "Inactive"}</Badge><Switch onCheckedChange={e => {
                            mutate({
                                id,
                                status: e
                            })
                        }} defaultChecked={active} />
                    </div>
                    <div className='flex space-x-2'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <FaEdit role='button' className='w-6 h-6 text-slate-200' />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <MdDeleteOutline role='button' className='w-6 h-6 text-slate-200' />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </CardFooter>
            </CardHeader>
        </Card>

    )
}

export default ProductCard