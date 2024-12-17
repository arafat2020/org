"use client";

import { SparklesPreview } from "@/app/_components/SparkleHeading";
import { trpc } from "@/app/_trpc/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useOrigin from "@/hooks/useOrigin";
import { deleteFile } from "@/lib/delete";
import { upload } from "@/lib/upload";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface FormData {
  name: string;
  designation: string;
  speach: string;
  LinkedInLink: string;
  twitterLink: string;
  emailLink: string;
  faceBookLink: string;
  pic: FileList;
}

function EditKeyContact({ params }: { params: { id: string } }) {
  const { data, isLoading } = trpc.keyContact.getKeyContactById.useQuery({
    id: params.id,
  });
  const utils = trpc.useUtils()
  const { mutate, isPending } = trpc.keyContact.editKeyContact.useMutation({
    onSuccess: () => {
      toast.success("Data Updated")
    },
    onError: (error) => toast.error(`Error:${error}`)
  })

  const { register, handleSubmit, setValue } = useForm<FormData>();

  // Populate default values when data is loaded
  React.useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("designation", data.designation);
      setValue("speach", data.speach || "");
      setValue("LinkedInLink", data.LinkedInLink || "");
      setValue("twitterLink", data.twitterLink || "");
      setValue("emailLink", data.emailLink || "");
      setValue("faceBookLink", data.faceBookLink || "");
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    const { pic, ...otherData } = formData;

    // Log form data
    console.log("Updated Data:", otherData);

    if (pic && pic[0]) {
      if (data?.pic !== "./person.svg" && data?.pic) await deleteFile(data.pic)
      const url = await upload(pic[0])
      mutate({
        id: params.id,
        data: {
          pic: url
        }
      })
    }

    mutate({
      id: params.id,
      data: otherData
    })
  };

  const origin = useOrigin();

  if (isLoading) {
    return (
      <div className="w-full h-auto animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="w-full flex space-x-6 mt-4">
          <div className="w-64 h-64 rounded-full border border-grey-200"></div>
          <form className="border border-gray-200 rounded-lg p-4 flex flex-col space-y-4 w-full flex-grow">
            {/* Profile Picture */}
            <div className="w-full flex flex-col space-y-1">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>

            {/* Name */}
            <div className="w-full flex flex-col space-y-1">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>

            {/* Designation */}
            <div className="w-full flex flex-col space-y-1">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>

            {/* Speech */}
            <div className="w-full flex flex-col space-y-1">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>

            {/* LinkedIn */}
            <div className="w-full flex flex-col space-y-1">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>

            {/* Twitter */}
            <div className="w-full flex flex-col space-y-1">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>

            {/* Email */}
            <div className="w-full flex flex-col space-y-1">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>

            {/* Facebook */}
            <div className="w-full flex flex-col space-y-1">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>

            {/* Submit Button */}
            <div className="h-10 bg-gray-200 rounded"></div>
          </form>
        </div>
      </div>

    );
  }

  if (!data) return notFound();

  return (
    <div className="w-full h-auto">
      <SparklesPreview title="Edit Key Contact" />
      <div className="w-full flex space-x-6 mt-4">
        <img
          src={data.pic ? `${origin}/${data.pic}` : "/person.svg"}
          alt={data.name || "Profile"}
          className="w-64 h-64 rounded-full object-cover border border-slate-700"
        />
        <form
          className="border border-slate-700 rounded-lg p-4 flex flex-col space-y-4 w-full flex-grow"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Profile Picture */}
          <div className="w-full flex flex-col space-y-1">
            <Label>Profile Picture</Label>
            <Input type="file" {...register("pic")} accept="image/*" />
          </div>

          {/* Name */}
          <div className="w-full flex flex-col space-y-1">
            <Label>Name</Label>
            <Input defaultValue={data.name} type="text" {...register("name")} />
          </div>

          {/* Designation */}
          <div className="w-full flex flex-col space-y-1">
            <Label>Designation</Label>
            <Input defaultValue={data.designation} type="text" {...register("designation")} />
          </div>

          {/* Speech */}
          <div className="w-full flex flex-col space-y-1">
            <Label>Speech</Label>
            <Textarea defaultValue={data.speach ? data.speach : ""} {...register("speach")} />
          </div>

          {/* LinkedIn */}
          <div className="w-full flex flex-col space-y-1">
            <Label>LinkedIn Link</Label>
            <Input defaultValue={data.LinkedInLink ? data.LinkedInLink : ""} type="url" {...register("LinkedInLink")} />
          </div>

          {/* Twitter */}
          <div className="w-full flex flex-col space-y-1">
            <Label>Twitter Link</Label>
            <Input defaultValue={data.twitterLink ? data.twitterLink : ""} type="url" {...register("twitterLink")} />
          </div>

          {/* Email */}
          <div className="w-full flex flex-col space-y-1">
            <Label>Email</Label>
            <Input defaultValue={data.emailLink ? data.emailLink : ""} type="email" {...register("emailLink")} />
          </div>

          {/* Facebook */}
          <div className="w-full flex flex-col space-y-1">
            <Label>Facebook Link</Label>
            <Input defaultValue={data.faceBookLink ? data.faceBookLink : ""} type="url" {...register("faceBookLink")} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={isPending}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditKeyContact;
