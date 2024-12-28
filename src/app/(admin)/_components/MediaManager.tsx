"use client"
import React from 'react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button'
import { CheckCheck, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
interface MediaManagerPropBase {
    id: string,
    onUpdate: ({ }: { id: string, mediaId?: string | null }) => void
}
type MediaManagerProp =
    | (MediaManagerPropBase & { mediaId: string | null; arrayOfIds?: never }) // When `id` is provided
    | (MediaManagerPropBase & { mediaId?: never; arrayOfIds: string[] }); // When `arrayOfIds` is provided

function MediaManager({
    id,
    mediaId,
    onUpdate,
    arrayOfIds
}: MediaManagerProp) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const { data: buckets, isLoading } = trpc.bucket.getAllBucket.useQuery()
    const { data: MediaList, isLoading: MediaListLoading } = trpc.media.getMediaByBucket.useQuery({
        id: value
    })
    if (isLoading) {
        return (
            <div className="w-full h-auto flex space-x-3 animate-pulse">
                <div className="w-40 h-10 bg-gray-700 rounded"></div>
                <div className="flex-grow grid grid-cols-4 gap-3 h-auto">
                    <div className='w-full flex space-x-3 items-center p-2'>
                        <div className="w-4 h-4 rounded-full bg-gray-700"></div>
                        <div className="w-14 h-14 bg-gray-700 rounded-md"></div>
                        <div className="flex-grow h-4 bg-gray-700 rounded-md"></div>
                    </div>
                    <div className='w-full flex space-x-3 items-center p-2'>
                        <div className="w-4 h-4 rounded-full bg-gray-700"></div>
                        <div className="w-14 h-14 bg-gray-700 rounded-md"></div>
                        <div className="flex-grow h-4 bg-gray-700 rounded-md"></div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='w-full h-auto flex space-x-3'>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {value
                            ? buckets?.find((bucket) => bucket.id === value)?.name
                            : "Select framework..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {buckets?.map((bucket) => (
                                    <CommandItem
                                        key={bucket.id}
                                        value={bucket.id}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        <CheckCheck
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === bucket.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {bucket.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <div className={cn("flex-grow rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 grid grid-cols-4 gap-3 h-auto", !MediaList?.length && "hidden")}>
                {
                    MediaList?.map(e => (
                        <div key={e.id} className='w-full flex space-x-3 cursor-pointer items-center border-[3px] bg-black/10 border-slate-800/50 rounded-md p-2'>
                            <Checkbox checked={(e.id === mediaId) || !!arrayOfIds?.find(id => id === e.id)} onCheckedChange={() => onUpdate({
                                id,
                                mediaId: mediaId ? (e.id === mediaId ? null : e.id) :  (!!arrayOfIds?.find(id => id === e.id) ? null : e.id)
                            })} />
                            <img loading='lazy' src={e.url} alt={e.name} className='w-14 h-14 object-fill rounded-md' />
                            <p className='flex-grow font-sans font-semibold capitalize line-clamp-1'>{e.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MediaManager