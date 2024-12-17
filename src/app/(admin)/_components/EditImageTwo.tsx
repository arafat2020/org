
"use client"

import { trpc } from '@/app/_trpc/client';
import { deleteFile } from '@/lib/delete';
import { upload } from '@/lib/upload';
import { cn } from '@/lib/utils'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from 'sonner';



interface EditImageProp {
  img: string,
  id: string,
  edit: boolean
}

function EditImage({
  id,
  img,
  edit
}: EditImageProp) {
  const utils = trpc.useUtils()
  const { mutate } = trpc.product.updateProduct.useMutation({
    onError:(error)=>{
      toast.error(
        <div>
          <p>Fail to Save</p>
          <p className='text-red-500'>{error.message.toString()}</p>
        </div>
      )
    },
    onSuccess:(data)=>{
      utils.product.getProductById.invalidate({
        id:id
      })
      toast.success(
        <div>
          <p>Fail to Save</p>
          <p className='text-cyan-500'>Product: {data.name}</p>
        </div>
      )
    },
    onMutate:()=>{
      toast.info("Saving File")
    }
  })
  const onDrop = useCallback(async (acceptedFiles: unknown) => {
    const files = acceptedFiles as File[]
    if (files === null) return
    if (!files[0].type.startsWith("image/")) {
      toast.error("Document is not an image")
      return;
    }
    const dl = await deleteFile(img)
    if (!dl) return
    const newUrl = await upload(files[0])
    if(!newUrl) return
    mutate({
      id:id,
      primaryImg: newUrl
    })
    

  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <div className='w-1/3 relative'>
      <div className={
        cn("top-0 left-0 w-full h-full absolute rounded-[20px] z-[999] transition duration-300 flex justify-around items-center",
          edit ? "scale-0" : "scale-1"
        )
      }>
        <div className='text-slate-100 font-sans font-bold bg-slate-600/50 text-center p-2 rounded-lg' {...getRootProps()}>
          <input {...getInputProps()} />
          <FaCloudUploadAlt className='w-12 h-12 mx-auto text-sky-700 p-3 border border-sky-800' />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag and drop some files here, or click to select files</p>
          }
        </div>
      </div>
      <img src={img} alt="product" className={cn("w-full rounded-[20px] transition duration-300",
        edit ? "blur-0" : "blur-md"
      )} />
    </div>
  )
}

export default EditImage