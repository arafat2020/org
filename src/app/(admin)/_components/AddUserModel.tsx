"use client"
import React, { useRef } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { LabelInputContainer } from '@/app/(main)/job/_components/JobForm'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { UserRole } from '@/lib/userRole'
import { trpc } from '@/app/_trpc/client'
import { toast } from 'sonner'


function AddUserModel({ children }: { children: React.ReactNode }) {
    const utils = trpc.useUtils()
    const ref = useRef<HTMLFormElement>(null)
    const { mutate, isPending } = trpc.user.createUser.useMutation({
        onSuccess:()=>{
            toast.success("New User Created")
            utils.user.getUser.invalidate()
            ref.current?.reset()
        },
        onError:(error)=>{
            toast.error(`Something Went Wrong ${error}`)
        }
    })
    type User = {
        username: string,
        email: string
        password: string
        UserRole: string
    }
    const {
        register,
        handleSubmit,
    } = useForm<User>();
    const onSubmit: SubmitHandler<User> = (data) => mutate(data)
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogDescription>
                        Make User as per your need according to the user role.
                    </DialogDescription>
                </DialogHeader>
                <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="my-8">
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label >User Name</Label>
                            <Input type="text" {...register("username", { required: true })} />
                        </LabelInputContainer>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label >Email</Label>
                            <Input type="email" {...register("email", { required: true })} />
                        </LabelInputContainer>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label>Password</Label>
                            <Input type="password" {...register("password", { required: true })} />
                        </LabelInputContainer>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                            <Label >User Role</Label>
                            <select 
                            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                            {...register("UserRole", { required: true })}>
                                
                                        {
                                            Object.values(UserRole).map(e => (
                                                <option key={e} value={e} className='capitalize'>{e}</option>
                                            ))

                                        }
                            </select>
                        </LabelInputContainer>
                    </div>
                    <Button type="submit" disabled={isPending} className='w-full mb-3'>Add User</Button>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddUserModel