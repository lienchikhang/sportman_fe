'use client';
import React, { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useChoice } from '@/libs/contexts/choice.context';
import { useCart } from '@/libs/contexts/cart.context';
import { ICart } from '@/libs/interfaces/order.interface';
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

const HeaderProductDetailSize: React.FC<Props> = ({ data }) => {

    const { stocks, id, productName, productPrice, frontImage } = data;
    const [amount, setAmount] = useState(1);
    const { curChoice, handleSetChoice } = useChoice();
    const { handleAddCart } = useCart();


    const handleChoice = (choice: string) => {
        // setCurChoice(choice);
        handleSetChoice(choice);
    }

    const handleChangeAmount = (number: number) => {
        if (amount + number < 1) return;
        setAmount(prev => prev + number);
    }

    const handleAddtoCart = (item: ICart) => {
        handleAddCart(item);
    }

    return (
        <>
            <div className='size'>
                <p>Size: </p>
                <div className="size__grid">
                    {
                        stocks.map((stock, idx) => {
                            return <button
                                className={`stockItem ${curChoice === stock.sizeTag.toUpperCase() ? 'active' : ''} ${stock.stocks < 1 ? 'unactive' : ''}`}
                                key={idx}
                                disabled={stock.stocks < 1}
                                onClick={() => handleChoice(stock.sizeTag.toUpperCase())}
                            >
                                <span>{stock.sizeTag.toUpperCase()}</span>
                            </button>
                        })
                    }
                </div>
            </div>
            <div className='finish'>
                <div className="amount">
                    <div className='amount-btn' onClick={() => handleChangeAmount(-1)}>
                        <RemoveIcon />
                    </div>
                    <span>{amount}</span>
                    <div className='amount-btn' onClick={() => handleChangeAmount(1)}>
                        <AddIcon />
                    </div>
                </div>
                <Button
                    callback={() => handleAddtoCart({
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
            </div>
        </>
    )
}

export default HeaderProductDetailSize