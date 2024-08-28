"use client"
import React from 'react'
import Logo from './Logo'
import { Navigation } from './Navigation'
import { ModeToggle } from './ModeToggle'
import { Menu } from 'lucide-react'
import { useSideBar } from '@/hooks/useSideBar'
import Link from 'next/link'

function Nav() {
  const sidebar = useSideBar();
  return (
    <nav className='flex justify-between items-center p-3 sticky top-0 left-0 bg-slate-100 z-50 dark:bg-black'>
      <div className='flex items-center space-x-2'>
        <Link href="/">
          <Logo />
        </Link>
        <Navigation />
      </div>
      <div className='flex items-center space-x-3'>
        <ModeToggle />
        <Menu
          role='button'
          className='w-6 h-6 text-cyan-500 md:hidden'
          onClick={() => sidebar.onOpen()}
        />
      </div>
    </nav>
  )
}

export default Nav