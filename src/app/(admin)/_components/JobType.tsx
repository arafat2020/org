
"use client"

import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import Job from './Job'
import { toast } from 'sonner'

function JobType() {
    const utils = trpc.useUtils()
    const { isLoading, data } = trpc.job.getJobType.useQuery()
    const { mutate, isPending } = trpc.job.addJobType.useMutation({
        onSuccess: () => {
            toast.success("New job type created")
            utils.job.getJobType.invalidate()
        }
    })
    return (
        <div className='col-span-1 h-auto p-3 border border-slate-500 rounded-md'>
            <div className='w-full flex justify-between border px-2 py-1'>
                <h2 className='font-sans font-semibold text-2xl'>Job Types</h2>
                <Button onClick={() => mutate({
                    type: "Untitled"
                })} disabled={isLoading || isPending} variant="ghost" ><FaPlus className='w-5 h-5' /></Button>
            </div>
            {
                isLoading ? (
                    <div className='py-2 w-full'>
                        <Loader2 className='w-7 h-7 animate-spin mx-auto' />
                    </div>
                ) : null
            }
            {
                data?.length ? (
                    <div className='w-full flex flex-col space-y-2 mt-3'>
                        {data?.map(e => (
                            <Job key={e.id} id={e.id} type={e.type} active={e.active} />
                        ))}
                    </div>
                ) : (
                    <div className='w-full mt-3'>
                        No job type posted yet....
                    </div>
                )
            }
        </div>
    )
}

export default JobType