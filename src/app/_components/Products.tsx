
"use client"

import React from 'react'
import { products } from './Hero'
import { SparklesPreview } from './SparkleHeading'

function Products() {
    return (
        <div className='w-full h-auto mt-3 '>
            <SparklesPreview title='Showcase of Our Products' />
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-rows-3 gap-3 mt-3 px-11'>
                {
                    products.map((e, i) => {
                        return <div style={{
                            backgroundImage: `url(${e.thumbnail})`
                        }} key={e.title} className='col-span-1 row-span-1  h-[200px] sm:h-[250px] md:h-[300px] bg-cover bg-center bg-no-repeat rounded-lg group/product relative'>
                            <div className='w-[90%] h-[90%] bg-black/40 opacity-0 transition duration-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/product:opacity-100 rounded-lg shadow-lg flex justify-around items-center'>
                                <button className="p-[3px] relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                                    <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                                       View
                                    </div>
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Products