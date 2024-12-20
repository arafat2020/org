"use client"
import { cn } from '@/lib/utils'
import { useSideBar } from '@/hooks/useSideBar'
import { ThemeProvider } from '../_components/theme-provider'
import Nav from '../_components/Nav'
import Footer from '../_components/Footer'
import Sidebar from '../_components/Sidebar'
import FooterAddress from '../_components/FooterAddress'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
  footer: React.ReactNode
}) {
  const sidebar = useSideBar();
  return (

    <>
      <Sidebar />
      <div className={
        cn(
          "w-full h-full overflow-x-auto dark:bg-slate-950 transition duration-300",
          sidebar.isOpen && "blur-lg"
        )
      }>
        <Nav />
        {children}
        <Footer FooterAddress={<FooterAddress/>}/>
      </div>
    </>
  )
}
