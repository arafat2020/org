"use client"
import { trpc } from '@/app/_trpc/client';
import { Loader2 } from 'lucide-react';
import { FaBox, FaCheckCircle, FaClipboardList, FaTimesCircle } from 'react-icons/fa';
import JobType from '../_components/JobType';
import UserList from '../_components/UserList';

function Admin() {
  const { data, isLoading } = trpc.site.getGeneralInfo.useQuery()
  if (isLoading) {
    return (
        <div className='w-full h-full flex justify-around items-center'>
            <Loader2 className='w-10 h-10 text-slate-100 animate-spin' />
        </div>
    );
}
  return (
    <div className="w-full h-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Products */}
        <div className="bg-slate-600 shadow-md rounded-lg overflow-hidden flex items-center p-4 border-[2px] border-cyan-600 border-l-0 border-t-0">
          <div className="bg-blue-500 text-white p-3 rounded-full">
            <FaBox size={24} />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-slate-50">{data?.[0]}</p>
          </div>
        </div>

        {/* Card 2: Total Active Products */}
        <div className="bg-slate-600 shadow-md rounded-lg overflow-hidden flex items-center p-4 border-[2px] border-cyan-600 border-l-0 border-t-0">
          <div className="bg-green-500 text-white p-3 rounded-full">
            <FaCheckCircle size={24} />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Total Active Products</h3>
            <p className="text-slate-50">{data?.[1]}</p>
          </div>
        </div>

        {/* Card 3: Total Inactive Products */}
        <div className="bg-slate-600 shadow-md rounded-lg overflow-hidden flex items-center p-4 border-[2px] border-cyan-600 border-l-0 border-t-0">
          <div className="bg-yellow-500 text-white p-3 rounded-full">
            <FaTimesCircle size={24} />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Total Inactive Products</h3>
            <p className="text-slate-50">{data?.[2]}</p>
          </div>
        </div>

        {/* Card 4: Total Job Applications */}
        <div className="bg-slate-600 shadow-md rounded-lg overflow-hidden flex items-center p-4 border-[2px] border-cyan-600 border-l-0 border-t-0">
          <div className="bg-red-500 text-white p-3 rounded-full">
            <FaClipboardList size={24} />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Total Job Applications</h3>
            <p className="text-slate-50">{data?.[3]}</p>
          </div>
        </div>
      </div>
      <div className='w-full mt-3 grid grid-cols-3 gap-3'>
        <JobType/>
        <UserList/>
      </div>
    </div>
  )
}

export default Admin