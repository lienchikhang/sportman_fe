'use client';
import React, { useEffect, useState } from 'react';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { Button } from './ui';
import { IProduct } from '@/libs/interfaces/product.interface';
import '../libs/styles/ui/product.scss';
import { Box, Skeleton } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';


interface Props {
    product: IProduct,
    style?: string,
}

const Product: React.FC<Props> = ({ product, style, }) => {

    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 700);
    }, [searchParams.toString()]);

    if (isLoading || !product) return <div className={`product__wrapper ${style}`}>
        <div className="product__top">
            <div className="color__wrapper">
                <div className='color__item' style={{ backgroundColor: '#c3c3c3', borderColor: '#c3c3c3' }}></div>
                <div className='color__item' style={{ backgroundColor: '#c3c3c3', borderColor: '#c3c3c3' }}></div>
            </div>
            <div className="product__nav">
                <CallMadeIcon />
            </div>
        </div>
        <Skeleton animation="wave" height={254} />
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
                    disable
                    text={"+"}
                />
            </div>
        </div>
    </div>;

    return (
        <div className={`product__wrapper ${style}`}>
            <Link href={`/products/${product?.id}`}>
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
            </Link>
            <div className="product__info">
                <h2 className='product__name'>{product?.productName.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
                <div className='product__price'>
                    {/* <span>{product?.productPrice.toLocaleString()}</span> */}
                    <span>{new Intl.NumberFormat('en-US').format(product?.productPrice)}</span>
                    <Button
                        callback={(event) => { event?.stopPropagation(); console.log('product'); }}
                        primary
                        text={"+"}
                        hasIntrospect
                        onlyLoading
                    />
                </div>
            </div>
        </div>
    )
}

export default Product