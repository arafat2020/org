
"use client"

import Tag from '@/app/_components/Tag'
import { trpc } from '@/app/_trpc/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Save } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { useDebounceCallback } from 'usehooks-ts'


interface EditDocProp {
  id: string,
  title: string,
  description: string
  edit: boolean,
  tag: { id: string; name: string; Product: { id: string; }[] } | null
}

function EditDoc({
  title,
  description,
  edit,
  id,
  tag
}: EditDocProp) {
  const {
    mutate
  } = trpc.product.updateProduct.useMutation({
    onMutate(variables) {
      toast("Saving document",{
        icon:<Save/>
      })
    },
    onSuccess: (data, variables, context) => {
      toast.success("Document Saved...")
    },
    onError:(error)=>{
      toast.error(
        <div>
          <p>Fail to Save</p>
          <p className='text-red-500'>{error.message.toString()}</p>
        </div>
      )
    }
  })
  const editName = useDebounceCallback((e) => {
    mutate({
      id,
      name: e
    })
  }, 300)

  const editDescription = useDebounceCallback((e) => {
    mutate({
      id,
      description: e
    })
  }, 300)

  return (
    <div className="w-full p-3 flex flex-col space-y-3">
      <div className='w-full flex flex-col space-y-3'>
        <Label>
          Product Name
        </Label>
        <Input disabled={edit} defaultValue={title} onChange={e=>editName(e.target.value)} type='text' name="product" required />
      </div>
      <div className='w-full flex flex-col space-y-3'>
        <Label>
          Descriptions
        </Label>
        <Textarea disabled={edit} defaultValue={description} onChange={e=>editDescription(e.target.value)} />
      </div>
      <Tag id={id} edit={edit} tag={tag} />
    </div>
  )
}

export default EditDoc