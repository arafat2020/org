"use client"
import React from 'react'
import { trpc } from '../_trpc/client'
import { Loader2 } from 'lucide-react'

function FooterAddress() {
    const {
        data: address,
        isLoading
    } = trpc.address.getAddress.useQuery()
    if (isLoading) {
        return <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-around">
            <Loader2 className='animate-spin'/>
        </div>
    }
    return (
        <>
            {address ? <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-xl font-semibold">Contact Us</h3>
                <p className="mt-4 dark:text-gray-400">
                    House {`${address.house} ${address.road}`}<br />
                    <a href={`mailto:${address.email}`}>Email: {address.email}</a><br />
                    Phone: {address.phone}
                </p>
            </div> : <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-xl font-semibold">Contact Us</h3>
                <p className="mt-4 dark:text-gray-400">
                    House 34 Road 5 Sector 13 Uttara 1230 Dhaka, Bangladesh<br />
                    <a href="mailto:anhatradeinternational1@gmail.com">Email: anhatradeinternational1@gmail.com</a><br />
                    Phone: +8801511560330
                </p>
            </div>}
        </>
    )
}

export default FooterAddress