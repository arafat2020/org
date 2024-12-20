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
import { useRouter } from 'next/navigation'

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
    showInHomePage: boolean,
    origin: string
}



function ProductCard({
    name,
    description,
    primaryImg,
    id,
    SubCategory,
    published,
    showInHomePage,
    origin
}: ProductCardProp) {
    const [active, setActive] = useState<boolean>(published);
    const [setForHom, setSetForHome] = useState<boolean>(showInHomePage);
    const { push } = useRouter();

    const utils = trpc.useUtils()
    const {
        mutate,
    } = trpc.product.inactiveProduct.useMutation({
        onSuccess: (data) => {
            setActive(data.published)
            toast.success(`Product set to ${data.published ? "Active" : "Inactive"}`)
        },
        onError: (error) => {
            setActive(state => !state)
            toast.error(
                <div>
                    <p>Failed To Perform Operation...</p>
                    <p>{error.message}</p>
                </div>
            )
        }
    })

    const {
        mutate: setAsHomeShowCase,
    } = trpc.product.setForHomePage.useMutation({
        onSuccess: (data) => {
            setSetForHome(data.showInHomePage)
            toast.success(
                data.showInHomePage ? "Product Set For Home page showcase" : "Product unset form homepage showcase"
            )
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
    const {
        mutate: deleteProduct,
        isPending
    } = trpc.product.deleteProduct.useMutation({
        onSuccess: (data) => {
            utils.product.getProducts.invalidate()
            toast.success("Product deleted")
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
                    <img src={`${origin}${primaryImg}`} alt='product' className='w-[80%] h-[300px] rounded-[20px] mx-auto py-3' />
                    <p className='italic'>#{SubCategory?.name}</p>
                </CardContent>
                <CardFooter className='flex justify-between items-center'>
                    <div className='flex-flex-col space-y-3'>
                        <div className='flex space-x-3 p-1 w-fit rounded-full border shadow-inner'>
                            <Badge variant={active ? "default" : "destructive"}>{active ? "Active" : "Inactive"}</Badge><Switch onCheckedChange={e => {
                                mutate({
                                    id,
                                    status: e
                                })
                            }} defaultChecked={active} />
                        </div>
                        <div className='flex space-x-3 p-1 rounded-full border shadow-inner'>
                            <Badge variant={setForHom ? "custom" : "default"}>{setForHom ? "Set for home" : "Unset for home"}</Badge><Switch onCheckedChange={e => {
                                setAsHomeShowCase({
                                    id,
                                    setForHome: e
                                })
                            }} defaultChecked={setForHom} />
                        </div>
                    </div>
                    <div className='flex space-x-2'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <FaEdit onClick={() => push(`/products/edit/${id}`)} role='button' className='w-6 h-6 text-slate-200' />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <MdDeleteOutline onClick={() => deleteProduct({
                                        id,
                                        origin
                                    })} role='button' className='w-6 h-6 text-slate-200' />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Delete</p>
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