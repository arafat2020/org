import { auth } from '@/auth/helper'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

async function AuthProvider({ children }: { children: React.ReactNode }) {
    const session = await auth()

    return (
        <SessionProvider basePath='/api/auth' session={session}>
            {children}
        </SessionProvider>
    )
}

export default AuthProvider