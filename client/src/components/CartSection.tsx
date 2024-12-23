'use client';
import { ICart } from '@/libs/interfaces/order.interface';
import React, { useEffect, useState } from 'react';
import { Error } from './ui';
import { Divider } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useOrder } from '@/libs/contexts/order.context';
import http from '@/libs/configs/http';
import { fetchCart } from '@/app/actions/cart.action';
import CartItem from './cart/CartItem';

interface Props {
    // content: {
    //     carts: ICart[],
    //     currentPage: number,
    //     totalPage: number,
    //     totalElements: number
    // }
}

const CartSection: React.FC<Props> = ({ }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasSelectedAll, setSelectedAll] = useState(true);
    const [carts, setCarts] = useState<ICart[]>([]);
    const [totalItem, setTotalItem] = useState(0);
    const { handleSetOrders, data } = useOrder();

    console.log({ orderContext: data })

    //fetch api
    useEffect(() => {
        fetchCart().then((res) => {
            console.log({ carts: res });
            if (!res?.content?.carts?.length) {
                setSelectedAll(false);
                return;
            }
            setCarts(res?.content?.carts);
            handleSetOrders(res?.content?.carts);
            setTotalItem(res?.content?.carts?.length);
        })
            .catch((err) => {
                console.log({ err });
            });
    }, []);

    //checking state all selected
    useEffect(() => {
        if (!hasSelectedAll) {
            handleSetOrders([]);
        } else {
            handleSetOrders(carts);
        }
    }, [hasSelectedAll])

    const handleSelectAll = () => {
        if (!carts.length) return;

        setSelectedAll(!hasSelectedAll);

    }

    const handleUnselectCartItem = async (productId: string, sizeTag: string) => {
        //flow:: disappear from cart

        if (!hasSelectedAll) return;

        //update cart in dbms
        try {
            const rs = await http.delete(`carts/delete/${productId}/${sizeTag}`, true);

            console.log({ deleteCart: rs });

            if (rs?.data?.statusCode == 200) {
                //fetch data again
                fetchCart()
                    .then((res) => {
                        setCarts(res?.content?.carts)
                        return res?.content?.carts;
                    })
                    .then((res) => handleSetOrders(res));
            }
        } catch (er) {
            console.log({ deleteCart: er });
        }

    }

    const handleSetSelectAll = (state: boolean) => {
        setSelectedAll(state)
    }

    const handleDeleteCartItem = async (productId: string, sizeTag: string) => {
        //delete cart in dbms
        try {
            const rs = await http.delete(`carts/delete/${productId}/${sizeTag}`, true);

            console.log({ deleteCart: rs });

            if (rs?.data?.statusCode == 200) {
                //fetch data again
                fetchCart()
                    .then((res) => {
                        setCarts(res?.content?.carts)
                        return res?.content?.carts;
                    })
                    .then((res) => handleSetOrders(res));
            }
        } catch (er) {
            console.log({ deleteCart: er });
        }

        //delete cart in orderContext
    }

    const handleUpdateCartItem = (cartItem: ICart, isIncrease: boolean) => {
        //delete cart in dbms
        if (isIncrease) {
            http.post(`/carts/add`, cartItem, true)
                .then((res) => {
                    console.log('res in increase', res);
                    if (res?.data?.statusCode == 200) {
                        //fetch data again
                        fetchCart()
                            .then((res) => {
                                setCarts(res?.content?.carts)
                                return res?.content?.carts;
                            })
                            .then((res) => handleSetOrders(res));
                    }
                });

            return;
        }

        //delete
        //case amount == 1
        if (cartItem.amount == 1) {
            handleDeleteCartItem(cartItem.productId, cartItem.sizeTag);
            return;
        }

        //delete
        //case amount != 1

    }

    if (error) return <Error />

    return (
        <div className='cartSection p-2'>
            <h1 className='text-3xl font-semibold mb-4'>Your cart</h1>
            {
                carts.length ? <>
                    <div className='flex items-center mb-4'>
                        <span onClick={handleSelectAll} className={`btnSelect mr-3 ${hasSelectedAll ? 'active' : 'unactive'}`}></span>
                        <div className='cart__condition'>
                            <p>ALL PRODUCTS</p>
                            <span className='divide'></span>
                            <span className='btnDeleteAll'>DELETE ALL</span>
                        </div>
                        <div className='w-[100px]'>
                            <p className='text-sm' style={{ color: '#999999' }}>AMOUNT</p>
                        </div>
                        <div className=''>
                            <p className='text-sm' style={{ color: '#999999' }}>PRICE</p>
                        </div>
                    </div>
                    <Divider />
                    <div className='cartList'>
                        {
                            carts.map((cart, idx) => {
                                return <CartItem allSelect={hasSelectedAll}
                                    dataCart={cart}
                                    key={idx}
                                    handleUnselectCartItem={handleUnselectCartItem}
                                    totalItem={totalItem}
                                    handleSetSelectAll={handleSetSelectAll}
                                    handleDeleteCartItem={handleDeleteCartItem}
                                    handleUpdateCartItem={handleUpdateCartItem}
                                />
                            })
                        }
                    </div>
                </> : <>
                    <div className='py-4'>
                        <p className='text-sm'>Your cart is empty.</p>
                        <p className='text-sm'>Go shopping now!</p>
                    </div>
                </>
            }
            <Divider />
            <div>
                <div className='flex items-center justify-between py-4'>
                    <p className='text-sm font-medium'>Temporary price</p>
                    <p className='text-sm'>{data?.total?.toLocaleString()} VND</p>
                </div>
                <div className='flex items-center justify-between py-4'>
                    <p className='text-sm font-medium'>Discount</p>
                    <p className='text-sm'>{0} VND</p>
                </div>
                <div className='flex items-center justify-between py-4'>
                    <p className='text-sm font-medium'>Shipping Fee</p>
                    <p className='text-sm'>Free</p>
                </div>
            </div>
            <Divider />
            <div className='flex items-center justify-between py-4'>
                <p className='text-sm font-medium'>Total Fee</p>
                <p className='text-base font-semibold'>{data?.total?.toLocaleString()} VND</p>
            </div>
        </div>
    )
}

export default CartSection;

/**
 * <div className='cartItem' key={idx}>
                            {hasSelectedAll ? <span onClick={() => handleUnselectCartItem(cart.productId, cart.sizeTag)} className={`btnSelect mr-2 ${hasSelectedAll ? 'active' : 'unactive'}`}></span>
                                            : <span onClick={() => handleSelectItem(cart.productId, cart.sizeTag)} className={`btnSelect mr-2 unactive`}></span>}
                            <div className='img__wrapper'>
                                <img src={cart?.frontImage} alt="" />
                            </div>
                            <div className='cartItem__info'>
                                <h3>{cart?.productName.replaceAll('-', ' ')}</h3>
                                <span className='info__size'>{cart?.sizeTag}</span>
                                <div className='cartItem__delete'>
                                    <DeleteOutlineOutlinedIcon />
                                    <span>Delete</span>
                                </div>
                            </div>
                            <div className='cartItem__amount'>
                                <span>-</span>
                                <span>{cart?.amount}</span>
                                <span>+</span>
                            </div>
                            <p className='font-semibold'>{cart?.productPrice}</p>
                        </div>
 */