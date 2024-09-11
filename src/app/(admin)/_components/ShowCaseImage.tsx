import { trpc } from '@/app/_trpc/client'
import { upload } from '@/lib/upload'
import { ShowcaseImage } from '@prisma/client'
import { Trash } from 'lucide-react'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { toast } from 'sonner';
import { deleteFile } from '@/lib/delete';


function ShowCaseImage({
  img,
  id
}: { img: ShowcaseImage[], id: string }) {
  const utils = trpc.useUtils()
  const { mutate } = trpc.product.addShowCaseImage.useMutation({
    onSuccess: () => {
      utils.product.getProductById.invalidate({
        id: id
      })
      toast.success("New ShowCase Image Added")
    },
    onError: (error) => {
      toast.error(
        <div>
          <p>Fail to Add</p>
          <p className='text-red-500'>{error.message.toString()}</p>
        </div>
      )
    }
  })
  const { mutate: remove } = trpc.product.removeShowCaseImage.useMutation({
    onSuccess: () => {
      utils.product.getProductById.invalidate({
        id: id
      })
      toast.success("ShowCase Image Removed")
    },
    onError: (error) => {
      toast.error(
        <div>
          <p>Fail to Remove</p>
          <p className='text-red-500'>{error.message.toString()}</p>
        </div>
      )
    }
  })
  const onDrop = useCallback(async (acceptedFiles: unknown) => {
    const files = acceptedFiles as File[]
    if (files === null) return
    if (!files[0].type.startsWith("image/")) {
      toast.error("Document is not an image")
      return;
    }
    const newUrl = await upload(files[0])
    if (!newUrl) return
    mutate({
      id: id,
      img: newUrl
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const removeShowcaseImage = async ({
    imgId,
    img
  }: {
    imgId: string,
    img: string
  }) => {
    const dl = await deleteFile(img);
    if (!dl) return
    remove({
      id: imgId,
      productId: id
    })
  }
  return (
    <>
      <h2 className='text-2xl font-sans font-bold py-3'>Showcase Image</h2>
      <div className='w-full h-[230px] p-3 flex space-x-3'>
        <div className='w-[180px] h-full rounded-lg bg-slate-500/60'>
          <div className='text-slate-100 font-sans font-bold bg-slate-600/50 text-center p-2 rounded-lg' {...getRootProps()}>
            <input {...getInputProps()} />
            <FaCloudUploadAlt className='w-12 h-12 mx-auto text-sky-700 p-3 border border-sky-800' />
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag or drop some files here, or click to select files</p>
            }
          </div>
        </div>
        <div className='flex-grow overflow-x-auto flex space-x-3'>
          {
            img.map(e => {
              return (
                <div key={e.id} className='w-[180px] h-full rounded-lg relative'>
                  <Trash role='button' onClick={() => {
                    removeShowcaseImage({
                      img: e.img,
                      imgId: e.id
                    })
                  }} className='top-3 right-3 text-rose-500 w-7 h-7 p-1 bg-slate-900/50 rounded-full absolute' />
                  <img src={e.img} alt="" className='w-full h-full rounded-lg' />
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default ShowCaseImage