"use client";

import { SparklesPreview } from "@/app/_components/SparkleHeading";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import KeyContactPr from "../_components/keyContactPr";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useOrigin from "@/hooks/useOrigin";
import { deleteFile } from "@/lib/delete";

function EditKeyContact() {
  const { push } = useRouter()
  const utils = trpc.useUtils()
  const origin = useOrigin()
  const { data: keyContacts, isLoading } = trpc.keyContact.getKeyContact.useQuery();
  const {mutate: deleteKeyContact,} = trpc.keyContact.deleteKeyContact.useMutation({
    onSuccess: () => {
      utils.keyContact.getKeyContact.invalidate()
      toast.success("Record Deleted")
    },
    onError: (error) => toast.error(`Failed: ${error.message}`)

  })
  const { mutate: AddKeyContact } = trpc.keyContact.addKeyContact.useMutation({
    onSuccess: () => {
      utils.keyContact.getKeyContact.invalidate()
      toast.success("New Record Added")
    },
    onError: (error) => toast.error(`Failed: ${error.message}`)
  })

  if (isLoading) {
    return <div className="w-full h-auto text-center">Loading...</div>;
  }

  return (
    <div className="w-full h-auto">
      <div className="w-full relative mb-6">
        <SparklesPreview title="Add And Edit Key Contact" />
        <Button onClick={() => AddKeyContact()} className="absolute top-5 right-5 flex space-x-3 items-center">
          <span>Add</span> <Plus />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {keyContacts && keyContacts.length > 0 ? (
          keyContacts.map((contact) => (
            <KeyContactPr
              pic={contact.pic}
              key={contact.id}
              name={contact.name}
              designation={contact.designation}
              linkedInLink={contact.LinkedInLink}
              twitterLink={contact.twitterLink}
              emailLink={contact.emailLink}
              facebookLink={contact.faceBookLink}
              onDelete={async() => {
                await deleteFile(contact.pic)
                deleteKeyContact({
                  id: contact.id,
                  origin
                })
              }}
              onUpdate={() => push(`/key-contact-edit/edit/${contact.id}`)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No key contacts available. Add a new contact to get started.
          </div>
        )}
      </div>
    </div>
  );
}

export default EditKeyContact;
