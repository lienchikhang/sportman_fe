'use client';
import React from 'react';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { Button } from './ui';
import { IProduct } from '@/libs/interfaces/product.interface';
import '../libs/styles/ui/product.scss';
import { Box, Skeleton } from '@mui/material';

interface Props {
    product: IProduct | null,
    style?: string,
    notify: (mess: string, isSuccess: boolean) => void,
}

const Product: React.FC<Props> = ({ product, style, notify }) => {

    if (!product) return <div className={`product__wrapper ${style}`}>
        <div className="product__top">
            <div className="color__wrapper">
                <div className='color__item' style={{ backgroundColor: '#c3c3c3', borderColor: '#c3c3c3' }}></div>
                <div className='color__item' style={{ backgroundColor: '#c3c3c3', borderColor: '#c3c3c3' }}></div>
            </div>
            <div className="product__nav">
                <CallMadeIcon />
            </div>
        </div>
        {/* <div className="product__image">
            <Skeleton animation="wave" height={320} />
        </div> */}
        <Skeleton animation="wave" height={320} />
        <div className="product__info">
            <Box>
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
            </Box>
            <div className='product__price'>
                <span>
                    <Skeleton animation="wave" width={100} />
                </span>
                <Button
                    callback={() => { }}
                    primary
                    showNotice={notify}
                    disable
                    text={"+"}
                />
            </div>
        </div>
    </div>;

    return (
        <div className={`product__wrapper ${style}`}>
            <div className="product__top">
                <div className="color__wrapper">
                    {
                        product.colors.map((color, idx: number) => {
                            return <div key={idx} className='color__item' style={{ backgroundColor: color, borderColor: color }}></div>
                        })
                    }
                </div>
                <div className="product__nav">
                    <CallMadeIcon />
                </div>
            </div>
            <div className="product__image">
                <img className='image__front' src={product?.frontImage} alt="" />
                <img className='image__back' src={product?.backImage} alt="" />
            </div>
            <div className="product__info">
                <h2 className='product__name'>{product?.productName.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
                <div className='product__price'>
                    <span>{product?.productPrice.toLocaleString()}</span>
                    <Button
                        callback={() => console.log('product')}
                        primary
                        text={"+"}
                        showNotice={notify}
                        hasIntrospect
                        onlyLoading
                    />
                </div>
            </div>
        </div>
    )
}

export default Product