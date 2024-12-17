
"use client"

import { BottomGradient, LabelInputContainer } from '@/app/(main)/job/_components/JobForm'
import { trpc } from '@/app/_trpc/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

function SignUp() {
    type SignUpInput = {
        username: string,
        password: string,
        email: string
    }
    const {
        register,
        handleSubmit,
    } = useForm<SignUpInput>();
    const utils = trpc.useUtils()
    const { data, isLoading } = trpc.user.isAdminExist.useQuery();
    const { mutate, isPending } = trpc.user.signUpAsAdmin.useMutation({
        onSuccess:(data)=>{
            toast.success(`New admin created as ${data.name}`)
            utils.user.isAdminExist.invalidate()
        },
        onError:()=>{
            toast.error("Something went wrong")
        }
    })
    const { push } = useRouter()
    if (isLoading) {
        return (
            <div className='w-full h-full flex justify-around items-center'>
                <Loader2 className='w-10 h-10 text-slate-100 animate-spin' />
            </div>
        )
    }
    if(data){
        push('/')
    }
    const onSubmit: SubmitHandler<SignUpInput> = (data) => mutate(data)

    return (
        <div className='w-full h-full flex justify-around items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-1/3 p-3'>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="UserName">User Name</Label>
                    <Input {...register("username", { required: true })} placeholder='Type your name' type="text" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="Full Name">Password</Label>
                    <Input {...register("password", { required: true })} placeholder='Type your name' type="password" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="Full Name">Email</Label>
                    <Input {...register("email", { required: true })} placeholder='Type your name' type="email" />
                </LabelInputContainer>
                <div>
                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        {isPending ? <Loader2 className='w-6 h-6 animate-spin mx-auto' /> : "Submit"}
                        <BottomGradient />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignUp