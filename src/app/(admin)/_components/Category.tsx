"use client"
import { trpc } from '@/app/_trpc/client'
import { cn } from '@/lib/utils'
import { Edit, Loader2, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useDebounceCallback } from 'usehooks-ts'
interface CategoryType {
    id: string,
    name: string
}
function Category({
    id,
    name
}: CategoryType) {
    const [edit, setEdit] = useState<boolean>(true)
    const utils = trpc.useUtils()
    const { mutate } = trpc.category.editCategory.useMutation({
        onSuccess:(data)=>{
            utils.category.getCategories.invalidate()
            toast.success("Category updated")
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
    const { mutate:deleteCategory } = trpc.category.removeCategory.useMutation({
        onSuccess:(data)=>{
            utils.category.getCategories.invalidate()
            toast.success("Category deleted")
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
        <div className=' flex items-center space-x-2  overflow-x-hidden'>
            <input
                onChange={e => saveName(e.target.value)}
                disabled={edit} defaultValue={name} type="text" className={cn("w-[100px] px-1 rounded-sm outline-none bg-transparent text-[1rem]",
                    !edit && "bg-cyan-700"
                )} />
            <button onClick={() => setEdit(state => !state)}>
                <Edit className='w-6 h-6' />
            </button>
            <button 
            onClick={() => deleteCategory({
                id
            })}
            >
                <Trash className='w-6 h-6' />
            </button>
        </div>
    )
}

export default Category