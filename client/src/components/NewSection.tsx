'use client';
import http from '@/libs/configs/http';
import { IProduct } from '@/libs/interfaces/product.interface';
import React, { useEffect, useState } from 'react';
import Product from './Product';
import { Button } from './ui';

const NewSection = () => {

    const [loading, setLoading] = useState(true);
    const [hasError, setError] = useState(false);
    const [products, setProducts] = useState<IProduct[] | null>(null);

    useEffect(() => {

        http.get("/products?sort=asc&pageSize=2")
            .then((res) => {
                if (res?.status != 200) { setError(true); return; }
                setProducts(res?.data?.content?.products);
                setLoading(false);
            })
            .catch((err) => { setError(true); setLoading(false) });

    }, []);

    if (loading) {
        return <div className='right__new'>
            <Product product={null} notify={() => { }} />
            <Product product={null} notify={() => { }} />
        </div>
    }

    if (hasError) {
        return <div className="error__wrapper max-h-[554px] mb-4">
            <div className='error'>
                <h2 className='error__heading'>Something is wrong! Please try again.</h2>
                <Button
                    callback={() => window.location.reload()}
                    primary
                    showNotice={() => { }}
                    text='Reload'
                />
            </div>
        </div>
    }

    return (
        <div className='right__new'>
            {products && products.map((pro: IProduct, idx: number) => {
                return <Product key={idx} product={pro} notify={() => { }} />
            })}
        </div>
    )
}

export default NewSection