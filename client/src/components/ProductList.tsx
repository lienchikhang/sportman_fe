'use client';
import http from '@/libs/configs/http';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Product from './Product';
import '../libs/styles/productList.scss';
import { Error } from './ui';
import { Pagination } from '@mui/material';

const ProductList = () => {

    const query = useSearchParams();
    const params = new URLSearchParams(query as any);
    const pathname = usePathname();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        http.get(`${pathname}?${params.toString()}`)
            .then((res) => {
                console.log({ res });
                if (res?.status != 200) { setError(true); return; }
                setLoading(false);
                setProducts(res?.data?.content?.products);
            })
            .catch((err) => { setError(true); setLoading(false); })
    }, [params.toString()]);

    console.log({ params: params.toString() })

    if (loading) {
        return <div className='productList__wrapper'>
            <Product product={null} style='col-span-3 w-full' />
            <Product product={null} style='col-span-3 w-full' />
            <Product product={null} style='col-span-3 w-full' />
            <Product product={null} style='col-span-3 w-full' />
            <Product product={null} style='col-span-3 w-full' />
            <Product product={null} style='col-span-3 w-full' />
            <Product product={null} style='col-span-3 w-full' />
            <Product product={null} style='col-span-3 w-full' />
        </div>
    }

    if (error) {
        return <div className='productList__error'>
            <Error />
        </div>
    }

    return (
        <div>
            <div className='productList__wrapper'>
                {
                    products.map((product, idx) => {
                        return <Product product={product} style='col-span-3 w-full' key={idx} />
                    })
                }
            </div>
            <Pagination count={10} color="secondary" />
        </div>
    )
}

export default ProductList