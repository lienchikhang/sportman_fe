'use client';
import { Pagination } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

interface Props {
    currentPage: number,
    totalPage: number,
}

const ProductPagination: React.FC<Props> = ({ currentPage, totalPage }) => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleChangePage = (e: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams as any);
        params.set('page', value.toString());
        router.push(`${pathname}?${params}`);
    }

    return (
        <>
            {
                totalPage ?
                    <Pagination
                        count={totalPage}
                        color="primary"
                        page={currentPage ? currentPage : 1}
                        onChange={handleChangePage} />
                    : <></>
            }
        </>
    )
}

export default ProductPagination