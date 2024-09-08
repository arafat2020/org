import { auth } from '@/auth/helper'
import React from 'react'

async function Test() {
    const session = await auth()

    return (
        <div>{JSON.stringify(session)}</div>
    )
}

export default Test