
"use client"

import { SparklesPreview } from '@/app/_components/SparkleHeading'
import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';
import ProductCard from '../../_components/ProductCard';

function Search() {
    type SearchFilter = {
        name: string | undefined,
        categoryId: string | undefined,
        subCategoryId: string | undefined
    }
    const [filter, setFilter] = useState<SearchFilter>({
        name: undefined,
        categoryId: undefined,
        subCategoryId: undefined
    })
    const { data, isLoading } = trpc.category.getCategories.useQuery();
    const {
        mutate,
        isPending,
        data:product
    } = trpc.product.searchOrFilter.useMutation({
        onError:(error)=>{
            toast.error(
                <div>
                    <p>Something Went Wrong</p>
                    <p>{error.message}</p>
                </div>
            )
        },
        onSuccess:()=>{
            toast.success("Filter Aplied")
        }
    })
    console.log(product);
    
    if (isLoading) {
        return (
            <div className='w-full h-full flex justify-around items-center'>
                <Loader2 className='w-10 h-10 text-slate-100 animate-spin' />
            </div>
        )
    }
    const getSubcategory = () => {
        if (filter.categoryId === undefined) return []
        return data?.filter((category) => category.id === filter?.categoryId)[0].subCategory
    }
    return (
        <div className='w-full min-h-full h-auto'>
            <SparklesPreview title='Search And Filter' />
            <div className='flex space-x-3'>
                <Input onChange={e => setFilter(state => ({
                    ...state,
                    name: e.target.value
                }))} type='text' className='flex-grow' />
                <Select value={filter?.categoryId} onValueChange={e => {
                    setFilter(state => ({
                        ...state,
                        categoryId: e
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
                <Select value={filter.subCategoryId} onValueChange={e => {
                    setFilter(state => ({
                        ...state,
                        subCategoryId: e
                    }))
                }}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Subcategory" />
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
                <Button disabled={isPending} onClick={() => mutate({
                    categoryID: filter.categoryId,
                    subCategoryId: filter.subCategoryId,
                    title: filter.name
                })} >
                    {isPending ? <Loader2 className='w-5 h-5 animate-spin' /> : "Search"}
                </Button>
            </div>
            {
                    product?.length ? (<div className='w-full mt-10 grid gap-3 grid-cols-3 grid-row-1'>
                        {
                            product.map(e => {
                                return (
                                    <ProductCard key={e.id} {...e} />)
                            })
                        }
                    </div>) : (<div className='w-full'>
                        <p className='text-center mt-3 '>No Product Found....</p>
                    </div>)
                }
        </div>
    )
}

export default Search