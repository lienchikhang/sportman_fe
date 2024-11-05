'use client';
import React from 'react';
import { Button } from './ui';
import '../libs/styles/playerSide.scss';

const PlayersSide = () => {
    return (
        <div className='playersSide__wrapper'>
            <div className="playersSide__full">
                <div className='full_content'>
                    <h2>EXBLOW WITH PLAYER</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore et voluptas consequuntur?</p>
                    <Button
                        callback={() => { }}
                        primary
                        showNotice={() => { }}
                        text='Explore now'
                    />
                </div>
                <img className='full__img' src="/side1.png" alt="" />
            </div>
            <div className="playersSide__split">
                <div className="split__first">
                    <div className="split__content">
                        <h2>TEAMMATE COLLECTION</h2>
                        <Button
                            callback={() => { }}
                            primary
                            showNotice={() => { }}
                            text='Explore now'
                        />
                    </div>
                    <img className='split__img' src="/side2.png" alt="" />
                </div>
                <div className="split__second">
                    <div className="split__content">
                        <h2>TEAMMATE COLLECTION</h2>
                        <Button
                            callback={() => { }}
                            primary
                            showNotice={() => { }}
                            text='Explore now'
                        />
                    </div>
                    <img className='split__img' src="/side2.png" alt="" />
                </div>

            </div>
        </div>
    )
}

export default PlayersSide