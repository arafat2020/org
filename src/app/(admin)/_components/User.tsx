
"use client"

import { cn } from '@/lib/utils'
import { Edit, Loader2, Shield, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { UserRole } from '@/lib/userRole'
import { SiCkeditor4 } from "react-icons/si";
import { IoIosPerson } from "react-icons/io";
import { BsPersonBadgeFill } from "react-icons/bs";
import { trpc } from '@/app/_trpc/client'
import { toast } from 'sonner'
import { useDebounceCallback } from 'usehooks-ts'



type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    UserRole: string;
}
function User({
    name,
    UserRole: role,
    id
}: User) {
    const [edit, setEdit] = useState<boolean>(false)
    const utils = trpc.useUtils()
    const { mutate: deleteUser } = trpc.user.deleteUser.useMutation({
        onSuccess: (data) => {
            utils.user.getUser.invalidate()
            toast.success("User deleted")
        },
        onMutate: () => {
            toast("Saving...", {
                icon: <Loader2 className='animate-spin' />
            })
        },
        onError: (error) => {
            toast.error(`Something Went Wrong ${error}`)
        }
    })

    const { mutate: editUser } = trpc.user.editUser.useMutation({
        onSuccess: (data) => {
            utils.user.getUser.invalidate()
            toast.success("User updated")
        },
        onMutate: () => {
            toast("Saving...", {
                icon: <Loader2 className='animate-spin' />
            })
        },
        onError: (error) => {
            toast.error(`Something Went Wrong ${error}`)
        }
    })
    const editName = useDebounceCallback(e => editUser({
        id,
        data: {
            name: e,
        }
    }), 400)
    const editUserRole = useDebounceCallback(e => editUser({
        id,
        data: {
            UserRole: e,
        }
    }), 400)
    return (
        <div className='w-full flex items-center space-x-2 bg-cyan-900 p-2 rounded-md'>
            <input onChange={e => editName(e.target.value)} disabled={!edit} defaultValue={name} type="text" className={cn("flex-grow outline-none bg-transparent text-xl line-clamp-1 p-1",
                edit && "outline-cyan-700"
            )} />
            <button
                onClick={() => setEdit(state => !state)}
            >
                <Edit className='w-6 h-6' />
            </button>
            <button onClick={() => deleteUser({
                id
            })}>
                <Trash className='w-6 h-6' />
            </button>
            {
                edit ? (
                    <select onChange={e => editUserRole(e.target.value)} className='p-1 rounded-sm capitalize'>
                        {
                            Object.values(UserRole).map(e => (
                                <option key={e} value={e} className='capitalize'>{e}</option>
                            ))
                        }
                    </select>
                ) : (
                    <Badge variant={role === UserRole.ADMIN ? "custom" : "outline"} className='flex space-x-3 py-1'>
                        <span className='capitalize'>{role}</span>
                        {role === UserRole.ADMIN && <Shield className='w-4 h-4 text-rose-500' />}
                        {role === UserRole.EDITOR && <SiCkeditor4 className='w-4 h-4 text-amber-500' />}
                        {role === UserRole.VISITOR && <IoIosPerson className='w-4 h-4 text-amber-500' />}
                        {role === UserRole.DEVELOPER && <BsPersonBadgeFill className='w-4 h-4 text-amber-500' />}
                    </Badge>
                )
            }
        </div >
    )
}

export default User