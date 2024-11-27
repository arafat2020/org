"use client"
import EditDoc from '@/app/(admin)/_components/EditDoc'
import EditImage from '@/app/(admin)/_components/EditImage'
import ShowCaseImage from '@/app/(admin)/_components/ShowCaseImage'
import { SparklesPreview } from '@/app/_components/SparkleHeading'
import Tag from '@/app/_components/Tag'
import { trpc } from '@/app/_trpc/client'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Loader2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import React, { useState } from 'react'

function Edit({
    params
}: { params: { id: string } }) {
    const [editable, setEditable] = useState<boolean>(true)
    const { data, isLoading } = trpc.product.getProductById.useQuery({
        id: params.id
    })
    if (isLoading) {
        return (
            <div className='w-full h-full flex justify-around items-center'>
                <Loader2 className='w-10 h-10 text-slate-100 animate-spin' />
            </div>
        )
    }
    if (!data) {
        return notFound()
    }
    console.log(data);
    
    return (
        <div className='w-full h-full relative'>
            <div className='flex p-1 rounded-full absolute top-0 right-0 space-x-3'>
                <Badge variant={!editable ? "default" : "outline"}>{!editable ? "Edit mode enabled" : "Enable Edit Mode"}</Badge>
                <Switch onCheckedChange={e => {
                    setEditable(!e)
                }} />
            </div>
            <h1 className='text-3xl font-sans font-bold py-3'>Edit and Save Product</h1>
            <div className='w-full flex space-x-3'>
                <EditImage img={data.primaryImg} id={data.id} edit={editable} />
                <EditDoc tag={data.Tag} id={data.id} title={data.name} description={data.description} edit={editable} />
            </div>
            <ShowCaseImage edit={!editable} id={data.id} img={data.showcaseImg} />
        </div>
    )
}

export default Edit