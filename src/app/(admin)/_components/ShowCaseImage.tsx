import { trpc } from '@/app/_trpc/client'
import { upload } from '@/lib/upload'
import { ShowcaseImage } from '@prisma/client'
import { Trash } from 'lucide-react'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { toast } from 'sonner';
import { deleteFile } from '@/lib/delete';
import { cn } from '@/lib/utils'


function ShowCaseImage({
  img,
  id,
  edit
}: { img: ShowcaseImage[], id: string, edit: boolean }) {
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
      <div className='w-full h-[270px] p-3 flex space-x-3'>
        <div className='flex-grow  flex flex-wrap space-x-3'>
          <div className='w-[180px] h-[230px] rounded-lg bg-slate-500/60 flex justify-around items-center'>
            <div className={cn("text-slate-100 font-sans font-bold bg-slate-600/50 text-center p-2 rounded-lg trasi duration-300",
              !edit ? "scale-0" : "scale-100"
            )} {...getRootProps()}>
              <input disabled={!edit} {...getInputProps()} />

              <FaCloudUploadAlt className='w-12 h-12 mx-auto text-sky-700 p-3 border border-sky-800' />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag or drop some files here, or click to select files</p>
              }
            </div>
          </div>
          {
            img.map(e => {
              return (
                <div key={e.id} className='w-[180px] h-[230px] rounded-lg relative mb-3'>
                  <Trash role='button' onClick={() => {
                    removeShowcaseImage({
                      img: e.img,
                      imgId: e.id
                    })
                  }} className='top-3 right-3 stroke-[3px] text-red-400  p-1 bg-zinc-500 rounded-full absolute' />
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