'use client';
import { ICart } from '@/libs/interfaces/order.interface';
import React, { useEffect, useState } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useOrder } from '@/libs/contexts/order.context';


interface Props {
    allSelect: boolean,
    dataCart: ICart,
    handleUnselectCartItem: (productId: string, sizeTag: string) => void,
    totalItem: number,
    handleSetSelectAll: (state: boolean) => void,
    handleDeleteCartItem: (productId: string, sizeTag: string) => void;
    handleUpdateCartItem: (cartItem: ICart, isIncrease: boolean) => void;
}

const CartItem: React.FC<Props> = ({
    allSelect,
    dataCart,
    handleUnselectCartItem,
    totalItem,
    handleSetSelectAll,
    handleDeleteCartItem,
    handleUpdateCartItem,
}) => {

    const [select, setSelect] = useState(false);
    const { handleSetOrders, data } = useOrder();

    useEffect(() => {
        if (!allSelect) {
            setSelect(false);
        }
    }, [allSelect]);

    const handleSelectItem = (cart: ICart) => {

        if (select) {
            setSelect(false);
            const idx = data.orders.findIndex(ord => ord.productId == cart.productId);

            data.orders.splice(idx, 1);

            handleSetOrders([...data.orders]);
            return;
        }

        //change item state
        setSelect(true);

        //add orders context

        const newOrders = [...data.orders, { ...cart }];

        if (newOrders.length == totalItem) {
            handleSetSelectAll(true);
        }

        handleSetOrders(newOrders);
    }

    return (
        <div className='cartItem'>
            {allSelect ? <span onClick={() => handleUnselectCartItem(dataCart.productId, dataCart.sizeTag)} className={`btnSelect mr-2 ${allSelect || select ? 'active' : 'unactive'}`}></span>
                : <span onClick={() => handleSelectItem(dataCart)} className={`btnSelect mr-2 ${select ? 'active' : 'unactive'}`}></span>}
            <div className='img__wrapper'>
                <img src={dataCart?.frontImage} alt="" />
            </div>
            <div className='cartItem__info'>
                <h3>{dataCart?.productName.replaceAll('-', ' ')}</h3>
                <span className='info__size'>{dataCart?.sizeTag}</span>
                <div className='cartItem__delete' onClick={() => handleDeleteCartItem(dataCart.productId, dataCart.sizeTag)}>
                    <DeleteOutlineOutlinedIcon />
                    <span>Delete</span>
                </div>
            </div>
            <div className='cartItem__amount px-6 py-2 rounded-full border' style={{ borderColor: '#d9d9d9' }}>
                <span className='cursor-pointer' onClick={() => handleUpdateCartItem(dataCart, false)}>-</span>
                <span>{dataCart?.amount}</span>
                <span className='cursor-pointer' onClick={() => handleUpdateCartItem(dataCart, true)}>+</span>
            </div>
            <p className='font-semibold'>{dataCart?.productPrice?.toLocaleString()}</p>
        </div>
    )
}

export default CartItem