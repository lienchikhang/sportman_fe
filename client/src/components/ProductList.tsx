'use client';
import http from '@/libs/configs/http';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Product from './Product';
import '../libs/styles/productList.scss';
import { Error } from './ui';
import { Pagination } from '@mui/material';

interface Props {
    notify: (mess: string, isSuccess: boolean) => void,
}

const ProductList: React.FC<Props> = ({ notify }) => {

    const query = useSearchParams();
    const params = new URLSearchParams(query as any);
    const router = useRouter();
    const pathname = usePathname();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [curPage, setCurPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        http.get(`/products?${params.toString()}`)
            .then((res) => {
                if (res?.status != 200) { setError(true); return; }
                setLoading(false);
                setProducts(res?.data?.content?.products);
                setCurPage(res?.data?.content?.currentPage);
                setTotalPage(res?.data?.content?.totalPage);
            })
            .catch((err) => { setError(true); setLoading(false); })
    }, [params.toString()]);

    const handleChangePage = (e: React.ChangeEvent<unknown>, value: number) => {
        setCurPage(value);
        params.set('page', value.toString());
        router.push(`${pathname}?${params}`)
    }

    if (loading) {
        return <div className='productList__wrapper'>
            <Product product={null} style='col-span-4 w-full' notify={() => { }} />
            <Product product={null} style='col-span-4 w-full' notify={() => { }} />
            <Product product={null} style='col-span-4 w-full' notify={() => { }} />
            <Product product={null} style='col-span-4 w-full' notify={() => { }} />
            <Product product={null} style='col-span-4 w-full' notify={() => { }} />
            <Product product={null} style='col-span-4 w-full' notify={() => { }} />
            <Product product={null} style='col-span-4 w-full' notify={() => { }} />
            <Product product={null} style='col-span-4 w-full' notify={() => { }} />
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
                    !loading && products.length ? products.map((product, idx) => {
                        return <Product product={product} style='col-span-4 w-full' key={idx} notify={notify} />
                    }) : <div>Oop! There's no product that match your find</div>
                }
            </div>
            {
                products.length != 0 && <Pagination count={totalPage} color="secondary" page={curPage} onChange={handleChangePage} />
            }
        </div>
    )
}

export default ProductList