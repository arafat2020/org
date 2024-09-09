
"use client"

import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import AddUserModel from './AddUserModel'
import User from './User'

function UserList() {
    const { data } = trpc.user.getUser.useQuery()
    return (
        <div className='col-span-2 h-auto p-3 border border-slate-500 rounded-md'>
            <div className='w-full flex justify-between border px-2 py-1'>
                <h2 className='font-sans font-semibold text-2xl'>User List</h2>
                <AddUserModel>
                    <Button variant="ghost" ><FaPlus className='w-5 h-5' /></Button>
                </AddUserModel>
            </div>
            <div className='w-full flex flex-col space-y-2 mt-3'>
                {data?.map(e => (
                    <User key={e.id} {...e} />
                ))}
            </div>
        </div>
    )
}

export default UserList