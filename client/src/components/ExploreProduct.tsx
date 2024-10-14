'use client';
import React from 'react';
import '../libs/styles/exploreProduct.scss';
import { Button } from './ui';
import NewSection from './NewSection';
import CallMadeIcon from '@mui/icons-material/CallMade';


const ExploreProduct = () => {
    return (
        <div className='explore__wrapper'>
            <h1>EXPLORE PRODUCTS</h1>
            <div className='explore__part'>
                <div className='explore__left'>
                    <div className='left__item'>
                        <div className='wrapper'>
                            <img src="/explore2.png" alt="" />
                            <img src="/explore4.png" alt="" />
                            <h2>LOVE THE SWIM YOU'RE IN</h2>
                            <Button
                                primary={true}
                                callback={() => console.log('explore')}
                                text='View All'
                            />
                        </div>
                    </div>
                    <div className='left__item'>
                        <div className='wrapper'>
                            <img src="/explore1.png" alt="" />
                            <h2>LOVE THE SWIM YOU'RE IN</h2>
                            <Button
                                primary={true}
                                callback={() => console.log('explore')}
                                text='View All'
                            />
                        </div>
                    </div>
                    <div className='left__bottom'>
                        <div className='bottom__wrapper'>
                            <h2> <span>90</span> <span>+</span> products</h2>
                        </div>
                        <div className='bottom__wrapper'>
                            <h2>
                                <span className='active'>15</span>
                                <span className='unactive'>km</span>
                            </h2>
                            <p className='sub'>FREE SHIPPING</p>
                        </div>
                    </div>
                </div>
                <div className='explore__right'>
                    <NewSection />
                    <div className='right__bottom'>
                        <div className='info'>
                            <h3>Find the best jersey!</h3>
                            <p>Shop now</p>
                        </div>
                        <img src="/explore6.png" alt="" />
                        <div className="product__nav">
                            <CallMadeIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExploreProduct