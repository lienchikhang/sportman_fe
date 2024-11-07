'use client';
import React, { useState } from 'react'
import { Button } from './ui';
import { Drawer } from '@mui/material';
import http from '@/libs/configs/http';
import { useRouter } from 'next/navigation';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

interface Props {
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

const ProductDetailOrder: React.FC<Props> = ({ data }) => {

    const { id, stocks, productName, productPrice, colors, seasons } = data;
    const [curChoice, setCurChoice] = useState('');
    const [openDrawer, setOpenDrawer] = useState(false);
    const [amount, setAmount] = useState(1);
    const router = useRouter();

    const handleChoice = (choice: string) => {
        setCurChoice(choice);
    }

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {

                console.log('clicked')
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setOpenDrawer(open);
            };

    const handleBuyNow = () => {

    }

    const handleChangeAmount = (number: number) => {
        if (amount + number < 1) return;
        setAmount((prev) => prev + number);
    }

    return (
        <>
            <Drawer
                anchor={'right'}
                open={openDrawer}
                onClose={toggleDrawer(false)}
            >
                <li>
                    <p>{productName}</p>
                </li>
                <li>
                    <p>{productPrice}</p>
                </li>
                <li>
                    <p>Cur choice:</p>
                    <p>{curChoice}</p>
                </li>
                <li>
                    <p>total</p>
                    <p>{productPrice * amount}</p>
                </li>
                <li>
                    <p onClick={() => handleChangeAmount(-1)}>-</p>
                    <p>{amount}</p>
                    <p onClick={() => handleChangeAmount(1)}>+</p>
                </li>
            </Drawer>
            <div className='productDetail__size'>
                <p>Size:</p>
                <div className='size__list'>
                    {
                        stocks.map((stock, idx) => {
                            return <div
                                className={`stockItem ${curChoice === stock.sizeTag.toUpperCase() ? 'active' : ''}`}
                                key={idx}
                                onClick={() => handleChoice(stock.sizeTag.toUpperCase())}
                            >
                                <span>{stock.sizeTag.toUpperCase()}</span>
                            </div>
                        })
                    }
                </div>
            </div>
            <button className='btn-add-to-cart' onClick={toggleDrawer(true)}>
                <ShoppingBasketIcon />
                <span>Add to cart</span>
            </button>
        </>
    )
}

export default ProductDetailOrder