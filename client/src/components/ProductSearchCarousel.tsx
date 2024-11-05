import Image from 'next/image';
import React from 'react';

interface Props {
    type?: string
}

const ProductSearchCarousel: React.FC<Props> = ({ type }) => {
    return <div>
        <img src="/allCarousel.jpg" alt="premier-logo" className={`${type == 'PREMIER' ? 'active' : 'unactive'}`} />
        <img src="/bundesCarousel.jpg" alt="bundesliga-logo" className={`${type == 'BUNDESLIGA' ? 'active' : 'unactive'}`} />
        <img src="/laligaCarousel.jpg" alt="laliga-logo" className={`${type == 'LALIGA' ? 'active' : 'unactive'}`} />
        <img src="/allCarousell.jpg" alt="football-logo" className={`${type == 'ALL' ? 'active' : 'unactive'}`} />
    </div>
}

export default ProductSearchCarousel