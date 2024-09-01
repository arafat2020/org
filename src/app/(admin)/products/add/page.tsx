
"use client"

import { trpc } from '@/app/_trpc/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { MouseEvent, useRef, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { upload } from '@/lib/upload'


function Add() {
    type ProductData = {
        name: string,
        description: string,
        catagoryId: string,
        subCategoryId: string
    }
    const [file, setSetFile] = useState<File>();
    const formRef = useRef<HTMLFormElement>(null);
    const [product, setProduct] = useState<ProductData>({
        name: "",
        description: "",
        catagoryId: "",
        subCategoryId: ""
    });
    const { data, isLoading } = trpc.getCategories.useQuery();
    const { mutate, isPending } = trpc.postProduct.useMutation({
        onError: (error) => {
            toast.error("Failed to save")
        },
        onSuccess: () => {
            toast.success("Successfully Saved");
            formRef.current?.reset();
            setProduct({
                name: "",
                description: "",
                catagoryId: "",
                subCategoryId: ""
            })
        },
    });

    console.log(product);
    const getSubcategory = () => {
        if (product.catagoryId === "") return
        return data?.filter((category) => category.id === product.catagoryId)[0].subCategory
    }
    if (isLoading) {
        return (
            <div className='w-full h-full flex justify-around items-center'>
                <Loader2 className='w-10 h-10 text-slate-100 animate-spin' />
            </div>
        )
    }
    const handleSubmit = async (e: MouseEvent) => {
        e.preventDefault()
        const img = await upload(file);
        if (!img) return
        mutate({
            catagoryId: product.catagoryId,
            description: product.description,
            name: product.name,
            primaryImg: img,
            subCategoryId: product.subCategoryId
        })
    }
    return (
        <div className='w-full'>
            <form ref={formRef} className='w-2/4 mx-auto border border-slate-700 rounded-[10px] p-3 flex flex-col space-y-3'>
                <h2 className='text-2xl text-center py-2 font-sans font-semibold'>Add Product</h2>
                <div className='w-full flex flex-col space-y-3'>
                    <Label>
                        Product Name
                    </Label>
                    <Input onChange={e => setProduct(prev => ({
                        ...prev,
                        name: e.target.value
                    }))} type='text' name="product" required />
                </div>
                <div className='w-full flex flex-col space-y-3'>
                    <Label>
                        Descriptions
                    </Label>
                    <Textarea onChange={e => setProduct(prev => ({
                        ...prev,
                        description: e.target.value
                    }))} />
                </div>
                <div className='w-full flex flex-col space-y-3'>
                    <Label>
                        Category
                    </Label>
                    <Select value={product.catagoryId} onValueChange={e => {
                        setProduct(state => ({
                            ...state,
                            catagoryId: e
                        }))
                    }}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                data?.map(e => {
                                    return (
                                        <SelectItem value={e.id} key={e.id}>
                                            {e.name}
                                        </SelectItem>
                                    )
                                })
                            }
                        </SelectContent>
                    </Select>

                </div>
                {
                    getSubcategory() && (

                        <div className='w-full flex flex-col space-y-3'>
                            <Label>
                                Subcategory
                            </Label>
                            <Select value={product.subCategoryId} onValueChange={e => {
                                setProduct(state => ({
                                    ...state,
                                    subCategoryId: e
                                }))
                            }}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        getSubcategory()?.map(e => {
                                            return (
                                                <SelectItem value={e.id} key={e.id}>
                                                    {e.name}
                                                </SelectItem>
                                            )
                                        })
                                    }
                                </SelectContent>
                            </Select>

                        </div>
                    )
                }
                <div className='w-full flex flex-col space-y-3'>
                    <Label>
                        Primary Image
                    </Label>
                    <Input onChange={e => {
                        if (e.target.files === null) return
                        if (!e.target.files[0].type.startsWith("image/")) {
                            toast.error("Document is not an image")
                            return;
                        }
                        setSetFile(e.target.files[0])
                    }} type='file' name="Image" required />
                </div>
                <Button onClick={handleSubmit} disabled={isPending} variant="secondary">
                    Save
                </Button>
            </form>
        </div>
    )
}

export default Add