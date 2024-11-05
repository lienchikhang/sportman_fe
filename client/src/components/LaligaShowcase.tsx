import React from 'react'
import ShowcaseCarousel from './ShowcaseCarousel';
import '../libs/styles/showcaseLeague.scss';
import SwiperLeague from './SwiperLeague';

const LaligaShowcase = () => {
    return (
        <div className='league__wrapper'>
            <ShowcaseCarousel
                league='LALIGA'
                bio='Apply #PRE30 to reduce 10% per order'
                img='/laliga.png'
                icon='/laligaLogo.png'
            />
            <SwiperLeague
                title='LALIGA'
                type='LALIGA'
                endpoint='/products?page=1&pageSize=10&sort=desc&league=LALIGA'
            />
        </div>
    )
}

export default LaligaShowcase;