'use client';
import { carouselList, subTitle, title } from '@/libs/constants/carousel'
import React from 'react';
import '../libs/styles/carousel.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const Carousel = () => {
    return (
        <div className='carousel__wrapper'>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                modules={[EffectFade, Navigation, Autoplay]}
                autoplay={{ delay: 3800, }}
                loop={true}
                effect="fade"
                navigation
            >
                {carouselList.map((carousel, idx) => <SwiperSlide key={idx}>
                    <div className='carousel__item'>
                        <img src={carousel.bg} alt="" />
                        <p></p>
                    </div>
                </SwiperSlide>)}
            </Swiper>
        </div>
    )
}

export default Carousel