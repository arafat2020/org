"use client"
import { useSideBar } from '@/hooks/useSideBar'
import { cn } from '@/lib/utils'
import React from 'react'
import Logo from './Logo'
import { ChevronDown, Loader2, X } from 'lucide-react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { FooterIcon } from './FooterIcon'
import { trpc } from '../_trpc/client'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Link from 'next/link'



function Sidebar() {
    const sidebar = useSideBar()
    const {
        data,
    } = trpc.category.getCategories.useQuery()
    const close = () => {
        sidebar.onClose()
    }
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
                        <Link href={'/key-contact'} onClick={close} className=' bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Key Content</p>
                        </Link>
                        <Link href={'/job'} onClick={close} className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Job</p>
                        </Link>
                        <Link href={'/about-us'} onClick={close} className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>About Us</p>
                        </Link>
                        <Link href={'/compliance'} onClick={close} className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Compliance</p>
                        </Link>
                        <Link href={'/why-us'} onClick={close} className='bg-slate-700/50 p-1 rounded-md w-fit my-2'>
                            <p>Wha Us</p>
                        </Link>
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible>
                    <CollapsibleTrigger>
                        <div className=' flex items-center space-x-3 mb-2 border border-t-0 border-x-0 border-b-cyan-600 pb-2'>
                            <span>Our Products</span> <ChevronDown className='w-5 h-5 text-cyan-600' />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <Menubar className='w-fit'>
                            {
                                data?.map(e => (
                                    <MenubarMenu key={e.id}>
                                        <MenubarTrigger>{e.name}</MenubarTrigger>
                                        <MenubarContent className='z-[999999]'>
                                            {
                                                e.subCategory.map(sub => (
                                                    <Link onClick={close} key={sub.id} href={`/products/${sub.id}`}>
                                                        <MenubarItem>{sub.name}</MenubarItem>
                                                    </Link>
                                                ))
                                            }
                                        </MenubarContent>
                                    </MenubarMenu>
                                ))
                            }
                        </Menubar>
                    </CollapsibleContent>
                </Collapsible>
                <Link href={'/contact'} onClick={close} className='w-2/5 flex items-center space-x-3 mb-2 border border-t-0 border-x-0 border-b-cyan-600 pb-2'>
                    <span>Contact Us</span>
                </Link>
                <Link href={'/our-service'} onClick={close} className='w-2/5 flex items-center space-x-3 mb-2 border border-t-0 border-x-0 border-b-cyan-600 pb-2'>
                    <span>Our Service</span>
                </Link>
                <FooterIcon />
            </div>
        </div>
    )
}

export default Sidebar