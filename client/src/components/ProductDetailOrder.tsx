'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useChoice } from '@/libs/contexts/choice.context';
import notificationEmitter from '@/libs/configs/eventDriven';
import { ICart } from '@/libs/interfaces/order.interface';
import { useCart } from '@/libs/contexts/cart.context';
import { Button } from './ui';

interface Props {
    data: {
        id: string,
        productName: string,
        productPrice: number,
        frontImage: string,
        colors: any[],
        stocks: {
            sizeTag: string,
            stocks: number,
        }[],
        seasons: any[],
    }
}

const ProductDetailOrder: React.FC<Props> = ({ data }) => {

    const { id, stocks, productName, productPrice, frontImage } = data;
    const [amount, setAmount] = useState(1);
    const { handleSetChoice, curChoice } = useChoice();
    const { handleAddCart } = useCart();

    const handleChoice = (choice: string) => {
        handleSetChoice(choice);
    }

    const handleBuyNow = (item: ICart) => {
        if (!curChoice) return;
        // notificationEmitter.emit('newCart', item);
        handleAddCart(item);
    }

    const handleChangeAmount = (number: number) => {
        if (amount + number < 1) return;
        setAmount((prev) => prev + number);
    }

    return (
        <>
            <div className='productDetail__size'>
                <p>Size:</p>
                <div className='size__list'>
                    {
                        stocks.map((stock, idx) => {
                            return <div
                                className={`stockItem ${curChoice === stock.sizeTag.toUpperCase() ? 'active' : ''} ${stock.stocks < 1 ? 'unactive' : ''}`}
                                key={idx}
                                onClick={() => handleChoice(stock.sizeTag.toUpperCase())}
                            >
                                <span>{stock.sizeTag.toUpperCase()}</span>
                            </div>
                        })
                    }
                </div>
            </div>
            <Button
                callback={() => handleBuyNow({
                    productId: id,
                    amount: 1,
                    productName,
                    frontImage,
                    productPrice: productPrice.toString(),
                    sizeTag: curChoice.toUpperCase(),
                })}
                style='btn-add-to-cart'
                primary
                disable={curChoice ? false : true}
                onlyLoading
                timer={1800}
                hasIntrospect
                text={
                    <>
                        <ShoppingBasketIcon />
                        <span>Add to cart</span>
                    </>
                }
            />
        </>
    )
}

export default ProductDetailOrder