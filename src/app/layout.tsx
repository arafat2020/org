import { ReactNode } from "react"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TRPCProvider from "./_trpc/Providor"
import { ThemeProvider } from "./_components/theme-provider"
import { cn } from "@/lib/utils"
const fontSans = Inter({ subsets: ['latin'], variable: "--font-sans" })
import { Toaster } from 'sonner'



function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className={cn(
                "w-screen h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}>
                <TRPCProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </TRPCProvider>
                <Toaster closeButton/>
            </body>
        </html>
    )
}

export default RootLayout