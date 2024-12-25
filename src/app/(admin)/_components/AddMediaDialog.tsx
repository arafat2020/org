"use client";

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog";
import { trpc } from '@/app/_trpc/client';
import { BottomGradient, LabelInputContainer } from '@/app/(main)/job/_components/JobForm';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface AddMediaDialogProp {
    children: React.ReactNode;
    bucketId: string;
}

function AddMediaDialog({ children, bucketId }: AddMediaDialogProp) {
    type MediaForm = {
        name: string;
        file: File[]; // Expecting an array of files
    };

    const utils = trpc.useUtils();
    const { mutate, isPending } = trpc.media.createMedia.useMutation({
        onSuccess: () => {
            utils.media.getMediaByBucket.invalidate({ id: bucketId });
            toast("New Media File added");
        },
        onError: (error) => {
            toast.error(`Something went wrong: ${error.message}`);
        },
    });

    const { register, handleSubmit, formState: { errors } } = useForm<MediaForm>();

    const onSubmit: SubmitHandler<MediaForm> = async (data) => {
        const { name, file } = data;

        if (!file || file.length === 0) {
            toast.error("Please select a file.");
            return;
        }

        if (!file[0].type.startsWith("image/")) {
            toast.error("Document is not an image");
            return;
        }

        // Create FormData and append fields
        const formData = new FormData();
        formData.set("name", name);
        formData.set("bucketId", bucketId); // Append the bucketId
        formData.set("file", file[0]); // Append the first file
        console.log(formData);
        
        // Submit the FormData
        mutate(formData);
    };

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Media</DialogTitle>
                    <DialogDescription>
                        <form
                            className="w-full h-auto flex flex-col space-y-3"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <LabelInputContainer>
                                <Label htmlFor="name">Media Name</Label>
                                <Input
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="Add a name for the media"
                                    type="text"
                                />
                                {errors.name && <span>{errors.name.message}</span>}
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="file">Media File</Label>
                                <Input
                                    {...register("file", { required: "File is required" })}
                                    type="file"
                                    accept="image/*"
                                />
                                {errors.file && <span>{errors.file.message}</span>}
                            </LabelInputContainer>

                            <button
                                disabled={isPending}
                                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                type="submit"
                            >
                                Upload &rarr;
                                <BottomGradient />
                            </button>
                        </form>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>Close</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddMediaDialog;

