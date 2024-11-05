'use client';
import { IProduct } from '@/libs/interfaces/product.interface';
import React, { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Product from './Product';
import { useRouter } from 'next/navigation';
import { Error } from './ui';
import http from '@/libs/configs/http';

interface Props {
    title: string,
    endpoint: string,
    type: string,
}

const SwiperLeague: React.FC<Props> = ({ title, type, endpoint }) => {

    const [products, setProducts] = useState<IProduct[] | null>(null);
    const [hasError, setHasError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        http.get(endpoint)
            .then((res) => {
                console.log('res', res);
                setProducts(res?.data?.content?.products);
            })
            .catch((err) => {
                console.log('err', err);
                setHasError(true);
            })
    }, []);

    const handleExplore = () => {
        router.push(`/products?page=1&pageSize=25&sort=desc&league=${type.toUpperCase()}`)
    }

    if (hasError) {
        return <div className='swiperLeague__wrapper'>
            <div className='showcase__heading'>
                <h1>{title}</h1>
                <p onClick={handleExplore}>Explore more</p>
            </div>
            <Error />
        </div>
    }

    return (
        <div className='swiperLeague__wrapper'>
            <div className='showcase__heading'>
                <h1>{title}</h1>
                <p onClick={handleExplore}>Explore more</p>
            </div>
            <Swiper
                slidesPerView={5}
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
        </div>
    )
}

export default SwiperLeague