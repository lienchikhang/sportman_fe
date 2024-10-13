'use client';
import http from '@/libs/configs/http';
import { IProduct } from '@/libs/interfaces/product.interface';
import React, { useEffect, useState } from 'react';
import Product from './Product';

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
            }).catch((err) => { setError(true); });

    }, []);

    console.log({ products });

    if (loading) {
        return <div>
            Loading...
        </div>
    }

    if (hasError) {
        return <div>
            Something is wrong! Please try again.
        </div>
    }

    return (
        <React.Fragment>
            {products && products.map((pro: IProduct, idx: number) => {
                return <Product key={idx} product={pro} />
            })}
        </React.Fragment>
    )
}

export default NewSection