"use client";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Logo from "@/app/_components/Logo";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { upload } from "@/lib/upload";

export function JobForm() {
  type JobApplication = {
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    phone: string;
    cv: File[] | string;
    jobTypeId: string;
  };
  type JobApplication2 = {
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    phone: string;
    cv: string;
    jobTypeId: string;
  };

  const { register, handleSubmit } = useForm<JobApplication>();
  const { data, isLoading } = trpc.job.getJobForJobApplication.useQuery();
  const ref = useRef<HTMLFormElement>(null)
  const { mutate, isPending } = trpc.job.sendJobLetter.useMutation({
    onSuccess: () => {
      toast.success("Job application submitted")
      ref.current?.reset()
    },
    onError: (error) => {
      toast.error(`Something Went Wrong ${error}`)
    }
  })
  const onSubmit: SubmitHandler<JobApplication> = async (data) => {
    console.log(data.cv);
    if (typeof (data.cv) !== "string" && data.cv[0].type === "application/pdf") {
      const url = await upload(data.cv[0])
      console.log(url)
      if (!url) return
      data.cv = url
      mutate(data as JobApplication2)
    } else {
      toast.error("Invalid file type. Only PDF accepted");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-around items-center">
        <Loader2 className="w-10 h-10 text-slate-100 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to <Logo />
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Join our team for better working experience and gain the most for your career.
      </p>

      <form ref={ref} className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input {...register("firstname", { required: true })} placeholder="Dravon" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input {...register("lastname", { required: true })} placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input {...register("email", { required: true })} placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="address">Your Address</Label>
          <Input {...register("address", { required: true })} placeholder="Enter Your Address" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phone">Phone Number</Label>
          <Input {...register("phone", { required: true })} placeholder="Enter Your Phone" type="tel" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="cv">Upload Your Cv</Label>
          <Input {...register("cv", { required: true })} id="cv" placeholder="Your CV" type="file" />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label>User Role</Label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...register("jobTypeId", { required: true })}
          >
            {data?.map((e) => (
              <option key={e.id} value={e.id} className="capitalize">
                {e.type}
              </option>
            ))}
          </select>
        </LabelInputContainer>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <button
          disabled={isPending}
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

export const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
