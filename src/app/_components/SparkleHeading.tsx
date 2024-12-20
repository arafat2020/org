"use client";
import { cn } from "@/lib/utils";
import React from "react";

export function SparklesPreview({ title, sparkle }: { title: string, sparkle?: boolean }) {
  return (
    <div className={cn("h-[3rem] sm:h-[4rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md",
      sparkle && "h-[6rem]"
    )}>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center dark:text-white relative z-20">
        {title}
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
