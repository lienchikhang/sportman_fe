'use client';
import React, { useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
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

const HeaderProductDetailSize: React.FC<Props> = ({ data }) => {

    const { stocks } = data;

    const [curChoice, setCurChoice] = useState('');
    const [amount, setAmount] = useState(1);

    const handleChoice = (choice: string) => {
        setCurChoice(choice);
    }

    const handleChangeAmount = (number: number) => {
        if (amount + number < 1) return;
        setAmount(prev => prev + number);
    }

    const handleAddtoCart = () => {

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
                <button>
                    <ShoppingBasketIcon />
                    <span>Add to cart</span>
                </button>
            </div>
        </>
    )
}

export default HeaderProductDetailSize