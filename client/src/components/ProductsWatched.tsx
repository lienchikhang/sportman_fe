'use client';
import { IProduct } from '@/libs/interfaces/product.interface';
import React, { useEffect, useState } from 'react';
import SwiperLeague from './SwiperLeague';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Product from './Product';

const ProductsWatched = () => {

    const [products, setProducts] = useState<IProduct[] | null>(null);

    useEffect(() => {
        const storage = localStorage.getItem("products::storage");
        if (storage) {
            const products: IProduct[] = JSON.parse(storage);
            setProducts(products);
        }
    }, []);

    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={100}
                navigation
                modules={[Navigation]}
            >
                {
                    products && products.map((pro, idx) => {
                        return <SwiperSlide key={idx}>
                            <Product product={pro} />
                        </SwiperSlide>
                    })
                }
            </Swiper>

        </>
    )
}

export default ProductsWatched