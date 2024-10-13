'use client';
import { carouselList, subTitle, title } from '@/libs/constants/carousel'
import React from 'react';
import '../libs/styles/carousel.scss';
import { Button } from './ui';

const Carousel = () => {
    return (
        <div className='carousel__wrapper'>
            <section className='carousel__top'>
                <h1>{title.normal} <span>{title.special}</span></h1>
                <p>{subTitle}</p>
                <Button
                    text='Join the sportman for free'
                    primary
                    callback={() => { console.log('test') }}
                    style='relative z-10'
                />
                <button className='cta__btn'>Shop all products</button>
                <div className='carousel__sub'>
                    {
                        carouselList.map((item, idx) => {
                            return <div className='carousel__sub-item' key={idx}>
                                <figure>
                                    <img src={item.bg} alt="" />
                                    <figcaption>
                                        <p>{item.title}</p>
                                    </figcaption>
                                </figure>
                            </div>
                        })
                    }
                </div>
            </section>
        </div>
    )
}

export default Carousel