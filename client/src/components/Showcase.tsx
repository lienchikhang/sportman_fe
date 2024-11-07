'use client';
import { IProduct } from '@/libs/interfaces/product.interface';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Product from './Product';
import 'swiper/css';
import '../libs/styles/showcase.scss';
import { Button } from './ui';
import http from '@/libs/configs/http';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const Showcase = () => {

    const route = useRouter();
    const [loading, setLoading] = useState(true);
    const [hasError, setError] = useState(false);
    const [products, setProducts] = useState<IProduct[] | null>(null);


    useEffect(() => {

        http.get("/products?sort=desc&pageSize=10")
            .then((res) => {
                if (res?.status != 200) { setError(true); return; }
                setProducts(res?.data?.content?.products);
                setLoading(false);
            })
            .catch((err) => { setError(true); setLoading(false) });

    }, []);

    const handleExplore = () => {
        route.push("/products?page=1&pageSize=25&sort=asc")
    }


    if (hasError) {
        return <div className='showcase__wrapper'>
            <div className='showcase__heading'>
                <h1>NEW PRODUCTS</h1>
                <p onClick={handleExplore}>Explore more</p>
            </div>
            <div className="showcase__products">
                <div className="error__wrapper">
                    <div className='error'>
                        <h2 className='error__heading'>Something is wrong! Please try again.</h2>
                        <Button
                            callback={() => window.location.reload()}
                            primary
                            text='Reload'
                        />
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <div className='showcase__wrapper'>
            <div className='showcase__heading'>
                <h1>New Products</h1>
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

export default Showcase;