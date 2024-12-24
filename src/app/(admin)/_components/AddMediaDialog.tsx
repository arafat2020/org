"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog"
import { trpc } from '@/app/_trpc/client'
import { BottomGradient, LabelInputContainer } from '@/app/(main)/job/_components/JobForm'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
interface AddMediaDialogProp {
    children: React.ReactNode,
    bucketId: string,
}

function AddMediaDialog({ children, bucketId }: AddMediaDialogProp) {
    type MediaForm = {
        file: FileList; // Use FileList for the input type
        name: string;
        bucketId: string;
    };

    const utils = trpc.useUtils();
    const { mutate, isPending } = trpc.media.createMedia.useMutation({
        onSuccess: () => {
            utils.media.getMediaByBucket.invalidate({
                id: bucketId,
            });
            toast("New Media File added");
        },
        onError: (error) => {
            toast.error(`Something Went Wrong: ${error.message}`);
        },
    });

    const { register, handleSubmit, formState: { errors } } = useForm<MediaForm>();
    const onSubmit: SubmitHandler<MediaForm> = async (data) => {
        const file = data.file[0];
      
        if (!file) {
          toast.error("Please select a file.");
          return;
        }
      
        // Read the file as a base64 string
        const fileBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Failed to read file"));
          reader.readAsDataURL(file); // Reads the file as a base64 string
        });
      
        const formData = {
          name: data.name,
          bucketId,
          file: fileBase64, // Send the base64-encoded file string
        };
      
        mutate(formData);
      };
      

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new file</DialogTitle>
                    <DialogDescription>
                        <form className="w-full h-auto flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
                            <LabelInputContainer>
                                <Label htmlFor="name">First name</Label>
                                <Input {...register("name", { required: true })} placeholder="Add name for media" type="text" />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="file">First name</Label>
                                <Input {...register("file", { required: true })} placeholder="Add media file" type="file" />
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

    )
}

export default AddMediaDialog