"use client"
import { useSideBar } from '@/hooks/useSideBar'
import { cn } from '@/lib/utils'
import React from 'react'
import Logo from './Logo'
import { ChevronDown, X } from 'lucide-react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { FooterIcon } from './FooterIcon'


function Sidebar() {
    const sidebar = useSideBar()
    return (
        <div className={
            cn(
                "w-screen h-screen transition duration-300 scale-y-0 bg-black/70 absolute z-[55555] flex flex-col",
                sidebar.isOpen && "scale-y-100"
            )
        }>
            <div className='w-full h-auto p-2 flex justify-between items-center'>
                <Logo />
                <X
                    role='button'
                    className='w-6 h-6 text-cyan-600'
                    onClick={sidebar.onClose}
                />
            </div>
            <div className='w-full flex-grow overflow-y-auto flex flex-col p-3 space-y-3'>
                <Collapsible>
                    <CollapsibleTrigger>
                        <div className='w-fit flex items-center space-x-3 mb-2 border border-t-0 border-x-0 border-b-cyan-600 pb-2'>
                            <span>Our Company</span> <ChevronDown className='w-5 h-5 text-cyan-600' />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className='w-2/5 bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Key Content</p>
                        </div>
                        <div className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Job</p>
                        </div>
                        <div className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>About Us</p>
                        </div>
                        <div className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Compliance</p>
                        </div>
                        <div className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Wha Us</p>
                        </div>
                        <div className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Sister Concern</p>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible>
                    <CollapsibleTrigger>
                        <div className=' flex items-center space-x-3 mb-2 border border-t-0 border-x-0 border-b-cyan-600 pb-2'>
                            <span>Others</span> <ChevronDown className='w-5 h-5 text-cyan-600' />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Link</p>
                        </div>
                        <div className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Link</p>
                        </div>
                        <div className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Link</p>
                        </div>
                        <div className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Link</p>
                        </div>
                        <div className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Link</p>
                        </div>
                        <div className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Link</p>
                        </div>
                        <div className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Link</p>
                        </div>
                        <div className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Link</p>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                <div className='w-2/5 flex items-center space-x-3 mb-2 border border-t-0 border-x-0 border-b-cyan-600 pb-2'>
                    <span>Contact Us</span> 
                </div>
                <div className='w-2/5 flex items-center space-x-3 mb-2 border border-t-0 border-x-0 border-b-cyan-600 pb-2'>
                    <span>Our Service</span> 
                </div>
                <FooterIcon/>
            </div>
        </div>
    )
}

export default Sidebar