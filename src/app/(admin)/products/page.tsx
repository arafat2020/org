"use client";

import { SparklesPreview } from '@/app/_components/SparkleHeading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React, { useEffect } from 'react';
import ProductCard from '../_components/ProductCard';
import { trpc } from '@/app/_trpc/client';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useOrigin from '@/hooks/useOrigin';


 function Product() {
    const origin = useOrigin()
    const query = useSearchParams();
    const { push } = useRouter();
    const currentPage = query.get("page") ? parseInt(query.get("page")!) : 1;

    const { data, isLoading } = trpc.product.getProducts.useQuery({
        page: currentPage - 1, // Pages start from 0 in the backend
    });

    if (isLoading) {
        return (
            <div className='w-full h-full flex justify-around items-center'>
                <Loader2 className='w-10 h-10 text-slate-100 animate-spin' />
            </div>
        );
    }

    const totalPages = data ? (Math.round(data?.count/6) + (data?.count % 6 ? 1 :0)) : 0

    const handlePageChange = (page:number) => {
        push(`/products?page=${page}`);
    };

    return (
        <div className='w-full h-auto relative'>
            <Button className='right-0 top-0 absolute'>
                <Link href='/products/add'>
                    Add Product
                </Link>
            </Button>
            <SparklesPreview title='All Products' />
            <div>
                {
                    data?.data.length ? (
                        <div>
                            <div className='w-full grid gap-3 grid-cols-3 grid-row-1'>
                                {
                                    data.data.map(e => {
                                        return (
                                            <ProductCard origin={origin} key={e.id} {...e} />
                                        );
                                    })
                                }
                            </div>
                            <div className='flex justify-center mt-5'>
                                <Button
                                    disabled={currentPage <= 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    Previous
                                </Button>
                                <span className='mx-2 font-sans font-semibol'>{currentPage} of {totalPages}</span>
                                <Button
                                    disabled={currentPage >= totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className='w-full'>
                            <p className='text-center'>No Product Found....</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Product;
