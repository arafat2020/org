"use client"

import { trpc } from '@/app/_trpc/client'
import { Loader2 } from 'lucide-react';
import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { BsFilePdf, BsTrash } from 'react-icons/bs';
import useOrigin from '@/hooks/useOrigin';
import { toast } from 'sonner';


function Documents() {
    const { data, isLoading } = trpc.job.getJobApplications.useQuery();
    const origin = useOrigin();
    const utils = trpc.useUtils();
    const {mutate, isPending} = trpc.job.deleteJob.useMutation({
        onSuccess: () => {
          toast.success("Job application deleted")
          utils.job.getJobApplications.invalidate()
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
        );
    }
    if (data === undefined) {
        return <div className='w-full h-full flex justify-around items-center'>
            <p className='text-center'>No Records Found</p>
        </div>
    }
    const columns: GridColDef<(typeof data)[number]>[] = [
        {
            field: "id",
            headerName: "ID",
            width: 150
        },
        {
            field: "firstname",
            headerName: "First Name",
            width: 150
        },
        {
            field: "lastname",
            headerName: "Last Name",
            width: 150
        },
        {
            field: "email",
            headerName: "Email",
            width: 150
        },
        {
            field: "address",
            headerName: "Address",
            width: 250
        },
        {
            field: "phone",
            headerName: "Phone Number",
            width: 150
        },
        {
            field: "jobtype",
            headerName: "Job Type",
            width: 150,
            valueGetter: (value, row) => row.jobtype.type,
        },
        {
            field: "cv",
            headerName: "CV",
            headerClassName:"text-center",
            width: 70,
            filterable: false,
            renderCell:(param)=>
                <button className='pt-2'>
                    <a href={param.row.cv}  download={param.row.cv}>
                    <BsFilePdf className='w-7 h-7  text-rose-500'/>
                </a>
                </button>
            
        },
        {
            field: "dl",
            headerName: "Delete",
            width: 100,
            filterable: false,
            renderCell:(param)=> <button className='pt-2' disabled={isPending} onClick={()=>mutate({
                id:param.row.id,
                origin
            })}><BsTrash className='w-7 h-7 text-rose-700'/></button>
            
        },
    ]
    return (
        <div className='w-full overflow-auto'>
            <DataGrid
                style={{
                    backgroundColor: "whitesmoke"
                }}
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                onStateChange={e=>{
                    console.log(e);
                    
                }}
                pageSizeOptions={[5, 10, 20]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
    )
}

export default Documents