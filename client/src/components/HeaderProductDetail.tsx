'use client';
import React, { useEffect, useState } from 'react';
import HeaderProductDetailSize from './HeaderProductDetailSize';
import { convertText } from '@/libs/funcs/textFuncs';

interface Props {
    frontImage: string,
    data: {
        id: string,
        productName: string,
        productPrice: number,
        colors: any[],
        stocks: {
            sizeTag: string,
            stocks: number,
        }[],
        seasons: any[],
    }
}

const HeaderProductDetail: React.FC<Props> = ({ data, frontImage }) => {

    const { productName, productPrice, colors, stocks } = data;
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 800) {
            // Cuộn xuống, hien header
            setIsHidden(false);
        } else {

            if (currentScrollY > 800) {
                setIsHidden(false);
            } else {

                setIsHidden(true);
            }

        }

        setLastScrollY(currentScrollY);
    };

    //add onScroll event
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header className={`HeaderProductDetail__wrapper ${isHidden ? 'active' : ''}`}>
            <div className='product'>
                <div className='product__image'>
                    <img src={frontImage} alt={productName} />
                </div>
                <div className='product__info'>
                    <h2>{convertText(productName.replaceAll('-', ' '), 50)}</h2>
                    <p>{new Intl.NumberFormat('en-US').format(productPrice)} VND</p>
                </div>
            </div>
            <div className='color'>
                <p>Colors:</p>
                <div className='color__grid'>
                    {colors.map((color, idx) => {
                        return <div className='color__item' key={idx} style={{ backgroundColor: `${color}`, borderColor: `${color}` }}>
                        </div>
                    })}
                </div>
            </div>
            <div className='rest'>
                <HeaderProductDetailSize data={{ ...data, frontImage }} />
            </div>
        </header>
    )
}

export default HeaderProductDetail