import React from 'react'
import ShowcaseCarousel from './ShowcaseCarousel';
import '../libs/styles/showcaseLeague.scss';
import SwiperLeague from './SwiperLeague';

const PremierLeagueShowcase = () => {
    return (
        <div className='league__wrapper'>
            <ShowcaseCarousel
                league='PREMIER LEAGUE'
                bio='Apply #PRE30 to reduce 10% per order'
                img='/premier.png'
                icon='/premierLogo.png'
            />
            <SwiperLeague
                title='PREMIER LEAGUE'
                type='premier'
                endpoint='/products?page=1&pageSize=10&sort=desc&league=PREMIER'
            />
        </div>
    )
}

export default PremierLeagueShowcase;