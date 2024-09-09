import { trpc } from '@/app/_trpc/client'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { Edit, Loader2, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useDebounceCallback } from 'usehooks-ts'

interface JobProp {
    id: string,
    type: string,
    active: boolean
}

function Job({
    id,
    type,
    active
}: JobProp) {
    const [edit, setEdit] = useState<boolean>(true)
    const utils = trpc.useUtils()
    const { mutate } = trpc.job.editJobType.useMutation({
        onSuccess:(data)=>{
            utils.job.getJobType.invalidate()
            toast.success("Job type updated")
        },
        onMutate:()=>{
            toast("Saving...", {
                icon:<Loader2 className='animate-spin'/>
            })
        },
        onError:()=>{
            toast.error("Something Went Wrong")
        }
    })
    const { mutate:deleteJob } = trpc.job.deleteJobType.useMutation({
        onSuccess:(data)=>{
            utils.job.getJobType.invalidate()
            toast.success("Job type deleted")
        },
        onMutate:()=>{
            toast("Saving...", {
                icon:<Loader2 className='animate-spin'/>
            })
        },
        onError:()=>{
            toast.error("Something Went Wrong")
        }
    })
    const saveType = useDebounceCallback(e=>{
        mutate({
            id,
            data:{
                type:e
            }
        })
    }, 400)
    return (
        <div className='w-full flex items-center space-x-2 bg-cyan-900 p-3'>
            <input onChange={e=>saveType(e.target.value)} disabled={edit} defaultValue={ type } type="text" className={cn("flex-grow outline-none bg-transparent text-xl",
                !edit && "outline-cyan-700"
            )} />
            <button onClick={()=>setEdit(state=>!state)}>
                <Edit className='w-6 h-6'/>
            </button>
            <button onClick={()=>deleteJob({
                id
            })}>
                <Trash className='w-6 h-6'/>
            </button>
            <Switch onCheckedChange={e=>mutate({
                id,
                data:{
                    active: e
                }
            })} defaultChecked={active}/>
        </div>
    )
}

export default Job