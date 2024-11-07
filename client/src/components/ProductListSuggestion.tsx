'use client';
import React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Product from './Product';
import { IProduct } from '@/libs/interfaces/product.interface';
import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
    data: {
        products: IProduct[],
        currentPage: number,
        totalPage: number,
        totalElements: number
    }
}

const ProductListSuggestion: React.FC<Props> = ({ data }) => {

    const { products, totalElements } = data;

    return (
        <Swiper
            slidesPerView={totalElements - 1}
            spaceBetween={(totalElements - 1) * 20}
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
    )
}

export default ProductListSuggestion