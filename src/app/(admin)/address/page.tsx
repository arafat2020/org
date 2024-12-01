"use client"

import { SparklesPreview } from '@/app/_components/SparkleHeading';
import { trpc } from '@/app/_trpc/client'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';
import { useDebounceCallback } from 'usehooks-ts';

function EditAddress() {
  const {
    data,
    isLoading
  } = trpc.address.getAddress.useQuery();
  const {
    mutate,
    isPending
  } = trpc.address.editAddress.useMutation({
    onSuccess: () => toast.success("Document Updated"),
    onError: (error) => toast.error(`Failed: ${error.message}`)
  })
  const editAddress = useDebounceCallback((e) => {
    if (!data) return
    mutate({
      id: data.id,
      data: e as object
    })
  }, 300)
  if (isLoading) {
    return (
      <div className='w-full h-full flex justify-around items-center'>
        <Loader2 className='w-10 h-10 text-slate-100 animate-spin' />
      </div>
    )
  }
  return (
    <div className='w-full h-auto '>
      <SparklesPreview title='Edit Address' />
      <div className='w-full flex flex-col space-y-3 mb-3'>
        <Label>
          House Name
        </Label>
        <Input   defaultValue={data?.house} onChange={e => editAddress({
          house: e.target.value
        })} type='text' name="product" required />
      </div>
      <div className='w-full flex flex-col space-y-3 mb-3'>
        <Label>
          Road
        </Label>
        <Input   defaultValue={data?.road} onChange={e => editAddress({
          road: e.target.value
        })} type='text' name="product" required />
      </div>
      <div className='w-full flex flex-col space-y-3'>
        <Label>
          Email Name
        </Label>
        <Input   defaultValue={data?.email} onChange={e => editAddress({
          email: e.target.value
        })} type='email' name="product" required />
      </div>
      <div className='w-full flex flex-col space-y-3'>
        <Label>
          Phone
        </Label>
        <Input   defaultValue={data?.phone ? data.phone : ""} onChange={e => editAddress({
          phone: e.target.value
        })} type='tel' name="product" required />
      </div>
    </div>
  )
}

export default EditAddress