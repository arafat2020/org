"use client";

import { BottomGradient, LabelInputContainer } from '@/app/(main)/job/_components/JobForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

function SignIn() {
    type SignInInput = {
        username: string;
        password: string;
    };

    const { register, handleSubmit } = useForm<SignInInput>();
    const router = useRouter();
    
    // Get the callbackUrl from the query string, or set a default value
    const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || "/admin";

    const onSubmit: SubmitHandler<SignInInput> = async (data) => {
        const result = await signIn("credentials", {
            username: data.username,
            password: data.password,
            callbackUrl, // Pass the callbackUrl here
            redirect: false, // Prevent automatic redirection
        });

        if (result?.error) {
            toast.error("Failed to Sign In");
        } else {
            // Redirect to the callbackUrl or a default page after successful login
            router.push(callbackUrl);
        }
    };

    return (
        <div className="w-full h-full flex justify-around items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 p-3">
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="username">User Name</Label>
                    <Input
                        {...register("username", { required: true })}
                        placeholder="Type your name"
                        type="text"
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        {...register("password", { required: true })}
                        placeholder="Type your password"
                        type="password"
                    />
                </LabelInputContainer>

                <div>
                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        Submit
                        <BottomGradient />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
