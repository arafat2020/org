import { cn } from '@/lib/utils'
import { Edit, Shield, Trash } from 'lucide-react'
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { UserRole } from '@/lib/userRole'
import { SiCkeditor4 } from "react-icons/si";
import { IoIosPerson } from "react-icons/io";
import { BsPersonBadgeFill } from "react-icons/bs";



type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    UserRole: string;
}
function User({
    name,
    UserRole: role
}: User) {
    return (
        <div className='w-full flex items-center space-x-2 bg-cyan-900 p-3'>
            <input disabled={true} defaultValue={name} type="text" className={cn("flex-grow outline-none bg-transparent text-xl line-clamp-1"
            )} />
            <button >
                <Edit className='w-6 h-6' />
            </button>
            <button>
                <Trash className='w-6 h-6' />
            </button>
            <Badge variant={role === UserRole.ADMIN ? "custom" : "outline"} className='flex space-x-3'>
                <span className='capitalize'>{role}</span>
                {role === UserRole.ADMIN && <Shield className='w-4 h-4 text-rose-500'/>}
                {role === UserRole.EDITOR && <SiCkeditor4 className='w-4 h-4 text-amber-500'/>}
                {role === UserRole.VISITOR && <IoIosPerson className='w-4 h-4 text-amber-500'/>}
                {role === UserRole.DEVELOPER && <BsPersonBadgeFill className='w-4 h-4 text-amber-500'/>}
            </Badge>
        </div>
    )
}

export default User