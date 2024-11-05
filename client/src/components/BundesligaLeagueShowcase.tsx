import React from 'react'
import ShowcaseCarousel from './ShowcaseCarousel';
import '../libs/styles/showcaseLeague.scss';
import SwiperLeague from './SwiperLeague';

const BundesligaShowcase = () => {
    return (
        <div className='league__wrapper'>
            <ShowcaseCarousel
                league='BUNDESLIGA'
                bio='Apply #BUN30 to reduce 12% per order'
                img='/bundesliga.png'
                icon='/bundesligaLogo.png'
            />
            <SwiperLeague
                title='BUNDESLIGA'
                type='BUNDESLIGA'
                endpoint='/products?page=1&pageSize=10&sort=desc&league=BUNDESLIGA'
            />
        </div>
    )
}

export default BundesligaShowcase;