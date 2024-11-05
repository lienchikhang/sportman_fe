'use client';
import React from 'react';
import { Button } from './ui';

interface Props {
    league: string,
    bio: string,
    img: string,
    icon: string,
}

const ShowcaseCarousel: React.FC<Props> = ({ league, bio, img, icon }) => {
    return (
        <div className="showcase__carousel">
            <div className="carousel__content">
                <img className='carousel__icon' src={icon} alt={`${league}-logo`} />
                <h1>{league.toUpperCase()}</h1>
                <p>{bio}</p>
                <Button
                    callback={() => { }}
                    primary
                    text='Explore now'
                    showNotice={() => { }}
                />
            </div>
            <div className="carousel__image">
                <img src={img} alt="" />
            </div>
        </div>
    )
}

export default ShowcaseCarousel