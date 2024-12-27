"use client"
import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { toast } from 'sonner'

function Review() {
    const utils = trpc.useUtils()
    const { push } = useRouter()
    const { data: reviewLis, isLoading } = trpc.cms.review.getReview.useQuery()
    const { mutate, isPending } = trpc.cms.review.addReview.useMutation({
        onSuccess: () => {
            toast.success("New Review Added")
            utils.cms.review.getReview.invalidate()
        },
        onError: (error) => toast.error(`Error:${error.message}`)
    })
    if (isLoading) {
        return (
            <div className='w-full h-auto animate-pulse'>
                <div className="w-full flex m-6 justify-between items-center">
                    <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-10 bg-gray-700 rounded w-1/4"></div>
                </div>
                <div className='w-full grid grid-cols-4 gap-3'>
                    <figure className='relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-200 bg-gray-700'>
                        <div className="flex flex-row items-center gap-2">
                            <div className="h-16 w-16 bg-gray-700 rounded-full"></div>
                            <div className="flex flex-col">
                                <div className="h-4 bg-gray-700 rounded w-3/4 mb-1"></div>
                                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                            </div>
                        </div>
                        <div className="mt-2 h-10 bg-gray-700 rounded"></div>
                        <div className="mt-2 h-10 bg-gray-700 rounded"></div>
                    </figure>
                    <figure className='relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-200 bg-gray-700'>
                        <div className="flex flex-row items-center gap-2">
                            <div className="h-16 w-16 bg-gray-700 rounded-full"></div>
                            <div className="flex flex-col">
                                <div className="h-4 bg-gray-700 rounded w-3/4 mb-1"></div>
                                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                            </div>
                        </div>
                        <div className="mt-2 h-10 bg-gray-700 rounded"></div>
                        <div className="mt-2 h-10 bg-gray-700 rounded"></div>
                    </figure>
                    <figure className='relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-200 bg-gray-700'>
                        <div className="flex flex-row items-center gap-2">
                            <div className="h-16 w-16 bg-gray-700 rounded-full"></div>
                            <div className="flex flex-col">
                                <div className="h-4 bg-gray-700 rounded w-3/4 mb-1"></div>
                                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                            </div>
                        </div>
                        <div className="mt-2 h-10 bg-gray-700 rounded"></div>
                        <div className="mt-2 h-10 bg-gray-700 rounded"></div>
                    </figure>
                </div><figure className='relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-200 bg-gray-700'>
                    <div className="flex flex-row items-center gap-2">
                        <div className="h-16 w-16 bg-gray-700 rounded-full"></div>
                        <div className="flex flex-col">
                            <div className="h-4 bg-gray-700 rounded w-3/4 mb-1"></div>
                            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                        </div>
                    </div>
                    <div className="mt-2 h-10 bg-gray-700 rounded"></div>
                    <div className="mt-2 h-10 bg-gray-700 rounded"></div>
                </figure>
            </div>
        )
    }
    return (
        <div className='w-full h-auto'>
            <div className="w-full flex m-6 justify-between items-center">
                <h2 className="text-2xl font-sans font-semibold">Company List</h2>
                <Button disabled={isPending} onClick={() => mutate()}>Add Company</Button>
            </div>
            <div className='w-full grid grid-cols-4 gap-3'>
                {
                    reviewLis?.map(e => (
                        <figure
                            key={e.id}
                            className={cn(
                                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                                // light styles
                                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                                // dark styles
                                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                            )}
                        >
                            <div className="flex flex-row items-center gap-2">
                                <img className="rounded-full" width="32" height="32" alt="" src={e.pic?.url || "/person.svg"} />
                                <div className="flex flex-col">
                                    <figcaption className="text-sm font-medium dark:text-white">
                                        {e.name}
                                    </figcaption>
                                    <a href={e.link || "#"} className="text-xs font-medium dark:text-white/40">@{e.name}</a>
                                </div>
                            </div>
                            <blockquote className="mt-2 text-sm line-clamp-2">{e.text}</blockquote>
                            <button
                                onClick={(event) => {
                                    event.stopPropagation(); // Prevents triggering the figure's onClick
                                    push(`/cms/review/edit/${e.id}`);
                                }}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 rounded-md border border-gray-950/[.2] bg-gray-950/[.05] py-2 text-sm font-medium text-gray-800 hover:bg-gray-950/[.1]",
                                    "dark:border-gray-50/[.2] dark:bg-gray-50/[.05] dark:text-gray-200 dark:hover:bg-gray-50/[.1]"
                                )}
                            >
                                <FiEdit2 className="h-4 w-4" /> Edit
                            </button>

                            {/* Delete Button */}
                            <button
                                onClick={(event) => {
                                    event.stopPropagation(); // Prevents triggering the figure's onClick
                                    if (confirm("Are you sure you want to delete this item?")) {

                                    }
                                }}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 rounded-md border border-gray-950/[.2] bg-gray-950/[.05] py-2 text-sm font-medium text-gray-800 hover:bg-red-100",
                                    "dark:border-gray-50/[.2] dark:bg-gray-50/[.05] dark:text-gray-200 dark:hover:bg-red-200 dark:hover:text-slate-700"
                                )}
                            >
                                <FiTrash2 className="h-4 w-4 text-red-600" /> Delete
                            </button>
                        </figure>
                    ))
                }
            </div>
        </div>
    )
}

export default Review