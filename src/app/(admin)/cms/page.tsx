import Link from 'next/link'
import React from 'react'
import { GrApps } from "react-icons/gr";


function Cms() {
    interface CmsRoute {
        name: string,
        href: string
    }
    const Components: CmsRoute[] = [
        {
            name: "Banner",
            href: "/cms/banner"
        },
        {
            name: "About Us",
            href: "/cms/about-us"
        },
        {
            name: "Company OverView",
            href: "/cms/company-overview"
        },
        {
            name: "List of Companies",
            href: "/cms/company"
        },
        {
            name: "Why us",
            href: "/cms/why-us"
        },
        {
            name: "Our factory",
            href: "/cms/our-factory"
        },
        {
            name: "Reviews",
            href: "/cms/review"
        }
    ]
    return (
        <div className="w-full h-auto grid grid-cols-5 gap-3">
            {
                Components.map(e=>(
                    <Link href={e.href} key={e.name} className='flex items-center space-x-3 bg-black/20 p-3 rounded-md'>
                        <GrApps className='w-14 h-14 text-slate-500'/>
                        <h1 className='line-clamp-1 font-sans text-xl flex-grow font-semibold'>{e.name}</h1>
                    </Link>
                ))
            }
        </div>
    )
}

export default Cms