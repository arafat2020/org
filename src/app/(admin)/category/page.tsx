
"use client"

import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import React from 'react'
import { FaPlus } from 'react-icons/fa';
import Ctr from "../_components/Category"
import { toast } from 'sonner';
import { TabsContent } from '@radix-ui/react-tabs';
import Subcategory from '../_components/Subcategory';

function Category() {
  const {
    isLoading,
    data
  } = trpc.category.getCategories.useQuery();
  const utils = trpc.useUtils()
  const { mutate, isPending } = trpc.category.addCategory.useMutation({
    onSuccess: () => {
      toast.success("New category created")
      utils.category.getCategories.invalidate()
    },
    onError: (error) => {
      toast.error(`Something went wrong:\n ${error.message}`)
    }
  })
  const { mutate:addSub, isPending:subP } = trpc.category.addSubCategory.useMutation({
    onSuccess: () => {
      toast.success("New subcategory created")
      utils.category.getCategories.invalidate()
    },
    onError: (error) => {
      toast.error(`Something went wrong:\n ${error.message}`)
    }
  })
  if (isLoading) {
    return (
      <div className='w-full h-full flex justify-around items-center'>
        <Loader2 className='w-10 h-10 text-slate-100 animate-spin' />
      </div>
    )
  }
  return (
    <div className='w-full h-auto'>
      <div className='w-full md:w-1/3 md:mx-auto'>
        <div className='w-full flex justify-between border px-2 py-1 rounded-md'>
          <h2 className='font-sans font-semibold text-2xl'>Categories</h2>
          <Button disabled={isPending} onClick={() => mutate({
            name: "Untitled"
          })} variant="ghost" ><FaPlus className='w-5 h-5' /></Button>
        </div>
      </div>
      {
        data?.length ? (
          <Tabs defaultValue={data[0].id} className='w-full flex flex-col space-y-2 mt-3'>
            <TabsList className={`w-full flex bg-transparent`}>
              {
                data.map(e => (
                  <TabsTrigger className='rounded-md' key={e.id} value={e.id}>
                    <Ctr id={e.id} name={e.name} />
                  </TabsTrigger>
                ))
              }
            </TabsList>
            {
              data.map(e => (
                <TabsContent className='w-full md:w-1/3 mx-auto' key={e.id} value={e.id}>
                  <div className='w-full p-2 flex justify-between items-center'>
                    <h2 className='font-sans font-semibold text-xl'>Subcategory for Category {e.name}</h2>
                    <Button onClick={() => addSub({
                      name: "Untitled",
                      categoryId: e.id
                    })} variant="ghost" ><FaPlus className='w-4 h-4' /></Button>
                  </div>
                  {
                    e.subCategory.length ? (
                      <div className='w-full flex flex-col space-y-2 mt-2'>
                        {
                          e.subCategory.map(se=>(
                            <Subcategory key={se.id} {...se}/>
                          ))
                        }
                      </div>
                    ) : (
                      <div className='w-full mt-3'>
                        No data posted yet....
                      </div>
                    )
                  }
                </TabsContent>
              ))
            }
          </Tabs>
        ) : (
          <div className='w-full mt-3'>
            No data posted yet....
          </div>
        )
      }
    </div>
  )
}

export default Category