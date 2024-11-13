'use client';
import notificationEmitter from '@/libs/configs/eventDriven';
import { convertText } from '@/libs/funcs/textFuncs';
import { ICart } from '@/libs/interfaces/order.interface';
import { Alert, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';

const CartNotification = () => {

    const [item, setItem] = useState<ICart | null>(null);
    const [isHidden, setHidden] = useState(true);

    useEffect(() => {

        notificationEmitter.on('newCart', (msg) => {
            setItem(msg);
            setHidden(false);
        });

        return () => {
            notificationEmitter.off('newCart', () => { });
        };

    }, []);

    useEffect(() => {
        if (isHidden) return;
        setTimeout(() => {
            setHidden(true);
        }, 3000);
    }, [isHidden])

    return (
        <div className={`bg-white fixed z-50 border top-44 right-10 p-6 rounded-xl shadow-lg text-sm font-semibold transition-all ${isHidden ? 'invisible' : 'visible'} max-w-[350px]`}>
            <h2 className='font-semibold pb-2'>Add successfully!</h2>
            <Divider />
            <div className='grid grid-cols-8 gap-6 py-3'>
                <div className="col-span-2 w-[69px] bg-slate-100 rounded-xl flex items-center justify-center">
                    <img className='w-full object-cover' src={item?.frontImage} alt="" />
                </div>
                <div className="col-span-6 flex flex-col gap-2">
                    <h2 className='text-sm font-semibold'>{item?.productName && convertText(item?.productName?.replaceAll("-", " "), 50)}</h2>
                    <p className='text-sm'>{item?.sizeTag}</p>
                    <p className='text-sm'>{item?.productPrice}</p>
                </div>
            </div>
            <button className='w-full px-6 py-2 rounded-2xl border-2 border-black bg-white'>
                Go to cart
            </button>
        </div>
    )
}

export default CartNotification;