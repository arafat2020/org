
"use client";
import React from 'react'

import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import NumberTicker from '@/components/magicui/number-ticker';
import Clinet from '@/icons/Clinet';
import Employee from '@/icons/Employee';
import Order from '@/icons/Order';
import Industry from '@/icons/Industry';

const DotPatternDemo2 = ({
    num,
    title,
    icon
}:{
    num:number,
    title: string,
    icon:React.ReactNode
}) => {
  return (
    <div className="relative flex col-span-2 row-span-1 md:col-span-1 md:row-span-2 items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl b border-r-sky-9000 border-b-sky-900 mb-3">
     <div className='flex flex-col space-y-2'>
      <div className='w-8 md:w-12 mx-auto'>
        {icon}
      </div>
     <p className="z-10 whitespace-pre-wrap text-center text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white">
        <NumberTicker value={num} delay={.3}/>
      </p>
      <p className="z-10 whitespace-pre-wrap text-center text-xl md:text-2xl font-medium tracking-tighter text-black dark:text-white font-sans">{title}</p>
     </div>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
        )}
      />
    </div>
  );
}


function Counter() {
  return (
    <div className='w-full h-[340px] md:h-[250px] mt-[5rem] grid grid-cols-4 grid-rows-2 gap-3 px-3 mb-5'>
        <DotPatternDemo2 icon={<Clinet fill='#5736eb'/>} num={85} title='Total Client'/>
        <DotPatternDemo2 icon={<Employee fill='#5736eb'/>} num={150} title='Total Employee'/>
        <DotPatternDemo2 icon={<Order fill='#5736eb'/>} num={85} title='Order Completed'/>
        <DotPatternDemo2 icon={<Industry fill='#5736eb'/>} num={150} title='Associated Factories'/>
    </div>
  )
}

export default Counter