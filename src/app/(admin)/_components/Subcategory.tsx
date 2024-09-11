
"use client"

import { trpc } from '@/app/_trpc/client'
import { cn } from '@/lib/utils'
import { Edit, Loader2, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useDebounceCallback } from 'usehooks-ts'

interface SubcategoryProp{
    id: string,
    name: string
}

function Subcategory({
    id,
    name
}:SubcategoryProp) {
    const [edit, setEdit] = useState<boolean>(true)
    const utils = trpc.useUtils()
    const { mutate } = trpc.category.editSubCategory.useMutation({
        onSuccess:(data)=>{
            utils.category.getCategories.invalidate()
            toast.success("subcategory updated")
        },
        onMutate:()=>{
            toast("Saving...", {
                icon:<Loader2 className='animate-spin'/>
            })
        },
        onError:(error)=>{
            toast.error(`Something Went Wrong ${error}`)
        }
    })
    const { mutate:deleteSubCategory } = trpc.category.removeSubCategory.useMutation({
        onSuccess:(data)=>{
            utils.category.getCategories.invalidate()
            toast.success("Subcategory deleted")
        },
        onMutate:()=>{
            toast("Deleting", {
                icon:<Loader2 className='animate-spin'/>
            })
        },
        onError:(error)=>{
            toast.error(`Something Went Wrong ${error}`)
        }
    })
    const saveName = useDebounceCallback(e=>{
        mutate({
            id,
            data:{
                name: e
            }
        })
    }, 400)
  return (
    <div className='w-full flex items-center space-x-2  overflow-x-hidden'>
            <input
                onChange={e => saveName(e.target.value)}
                disabled={edit} defaultValue={name} type="text" className={cn("flex-grow px-1 rounded-sm outline-none bg-transparent text-[1rem]",
                    !edit && "bg-cyan-600"
                )} />
            <button onClick={() => setEdit(state => !state)}>
                <Edit className='w-6 h-6' />
            </button>
            <button 
            onClick={() => deleteSubCategory({
                id
            })}
            >
                <Trash className='w-6 h-6' />
            </button>
        </div>
  )
}

export default Subcategory