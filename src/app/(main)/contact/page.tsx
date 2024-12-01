
"use client"

import React, { useRef } from 'react';
import { BottomGradient, LabelInputContainer } from '../job/_components/JobForm';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from "react-hook-form"
import { trpc } from '@/app/_trpc/client';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';


const Contact = () => {
    type ContactInput = {
        name: string,
        email: string,
        message: string
    }
    const {
        register,
        handleSubmit,
    } = useForm<ContactInput>();
    const inputRef = useRef<HTMLFormElement>(null)
    const { mutate, isPending } = trpc.mail.sendMail.useMutation({
        onSuccess:()=>{
            toast.success("Mail has sent, please wait for response")
            inputRef.current?.reset()
        },
        onError:()=>{
            toast.error("Something is went wrong")
        }
    })
    const onSubmit: SubmitHandler<ContactInput> = (data) => mutate(data)
    const {
        data: address,
        isLoading
    } = trpc.address.getAddress.useQuery()
    return (
        <div className="min-h-screen w-full bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100">
            <header className="p-4 flex justify-between items-center border-b">
                <h1 className="text-2xl font-bold">Contact Us</h1>
            </header>
            <main className="p-8">
                <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Map & Address Section */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Our Location</h2>
                        <iframe
                            className="w-full h-64 mb-4 rounded-lg"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096475!2d144.95373631531695!3d-37.81627927975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43fba34d39%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1601472818901!5m2!1sen!2sus"
                            allowFullScreen
                            loading="lazy"
                            title="Company Location"
                        ></iframe>
                        <p className="text-lg">
                            <strong>Anha Trade International</strong>
                            <br />
                            House {address?.house}  
                            <br />
                            {address?.road}
                            <br />
                            Phone: {address?.phone}
                        </p>
                    </div>

                    {/* Contact Form Section */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                        <form ref={inputRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-gray-700 dark:text-gray-100">
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="Full Name">Full Name</Label>
                                <Input {...register("name", { required: true })} placeholder='Type your name' type="text" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="email">Email Address</Label>
                                <Input {...register("email", { required: true })} placeholder="projectmayhem@fc.com" type="email" />
                            </LabelInputContainer>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium">
                                    Message
                                </label>
                                <textarea
                                    {...register("message", { required: true })}
                                    rows={4}
                                    className="mt-1 block w-full px-3 py-2 bg-slate-950 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                                    placeholder="Your Message"
                                ></textarea>
                            </div>
                            <div>
                                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                                <button
                                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                    type="submit"
                                >
                                    {isPending ? <Loader2 className='w-6 h-6 animate-spin mx-auto'/> : "Submit"}
                                    <BottomGradient />
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Contact;
