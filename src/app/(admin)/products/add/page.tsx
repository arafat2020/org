
"use client"

import { trpc } from '@/app/_trpc/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from 'lucide-react'


function Add() {
    const { data, isLoading } = trpc.getCategories.useQuery()
    const [product, setProduct] = useState<{
        name: string,
        description: string,
        primaryImg: string,
        catagoryId: string,
        subCategoryId: string
    }|{}>({});
    console.log(product);
    
    if (isLoading) {
        return (
            <div className='w-full h-full flex justify-around items-center'>
                <Loader2 className='w-10 h-10 text-slate-100 animate-spin' />
            </div>
        )
    }
    return (
        <div className='w-full'>
            <form className='w-2/4 mx-auto border border-slate-700 rounded-[10px] p-3 flex flex-col space-y-3'>
                <h2 className='text-2xl text-center py-2 font-sans font-semibold'>Add Product</h2>
                <div className='w-full flex flex-col space-y-3'>
                    <Label>
                        Product Name
                    </Label>
                    <Input type='text' name="product" required />
                </div>
                <div className='w-full flex flex-col space-y-3'>
                    <Label>
                        Descriptions
                    </Label>
                    <Textarea />
                </div>
                <div className='w-full flex flex-col space-y-3'>
                    <Label>
                        Descriptions
                    </Label>
                    <Select onValueChange={e => {
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
            </form>
        </div>
    )
}

export default Add